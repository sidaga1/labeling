from flask import Flask,  redirect, url_for, render_template, request, session 
import requests

app = Flask(__name__)
app.secret_key = "echodyne"

@app.route("/", methods=["POST", "GET"])
def login():
    session.clear()
    if request.method == "POST":
        user = request.form["nm"]
        session["user"] = user
        return redirect(url_for("explore"))
    else:
        return render_template("login.html")
    

@app.route("/explore", methods=["POST", "GET"])
def explore():
    if request.method == "POST":
        inputs = request.form.copy()
        if inputs.get("golabel") == "Label Images":
            return redirect(url_for("label"))
        inputs = request.form.copy()
        # if "remove" in inputs:
        #     del inputs["remove"]
        #     session["tests"] = generateImages(inputs)
        #     return render_template("filter.html", name=session["user"] + " exploring", tests = session["tests"])
        # # selected = {}
        # if inputs["date"] != '':
        #     selected["date"] = inputs["date"]
        # if inputs["location"] != '':
        #     selected["location"] = inputs["location"]
        # if inputs["label"] != 'Select':
        #     selected["label"] = inputs["label"]
        # if inputs["labeler"] != '':
        #     selected["labeler"] = inputs["labeler"]
        # if inputs["radarsn"] != '':
        #     selected["radarsn"] = inputs["radarsn"]  
        
        session["tests"] = generateImages(inputs) 
        print(session['tests'])
        return render_template("filter.html", name=session["user"] + " exploring", tests = session["tests"])
    else:
        if "user" in session:
            session["tests"] = generateFieldTests()
            return render_template("filter.html", name=session["user"] + " exploring", tests = session["tests"])
        else:
            return redirect(url_for("login"))
        
@app.route("/label", methods=["POST", "GET"])
def label():
    if request.method == 'GET':
        if "tests" in session:
            if 'i' in session:
                session['i'] += 1
            else:
                session['i'] = 0
            print(session['tests'])
            test = session['tests'][session['i']]
            return render_template("view.html", name = session["user"] + " viewing", 
                                test=test, index = session['i'], total = len(session['tests']))
        else:
            return redirect(url_for("login"))
    else:
        x = requests.post('url', json = {'label' : [request.form['label'], session['user'], False]})

@app.route("/test")
def test():
    r = requests.get(url='http://10.18.225.144:5000/get_all_entries')
    print(r.text)
    return render_template("search.html")

def generateImages(inputs):
    tests = session["tests"]
    select = []
    for test in tests:
        for input in inputs:
            if inputs[input] in test:
                select.append(test)
    return select

def generateFieldTests():
    # r = requests.get(url='http://10.18.225.144:5000/get_all_entries')
    # fieldTests = []
    # for map in r.text:
    #     fieldTests.append(map.values())

    fieldTests = []
    for i in range(20):
        label = ""
        secondLabel = ""
        if i % 4 == 0:
            label = "Drone"
            secondLabel = 'Bird'
        elif i % 3 == 0:
            label = "Bird"
            secondLabel = 'Drone'
        elif i % 2 == 0:
            label = "UFO"
            secondLabel = 'Person'
        else:
            label = "Person"
            secondLabel = 'UFO'
        fieldTests.append(["2023-05-"+f'{i:02d}', "lat,long", 
                           [[label, "sid", True], [secondLabel, "akhil", False]], "RADARSNXXXX", "CAMERASNXXXX"])
    return fieldTests
  
if __name__ == "__main__":
    app.run(debug=True)