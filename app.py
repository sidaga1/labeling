from flask import Flask,  redirect, url_for, render_template, request, session, send_file
import requests

app = Flask(__name__)
app.secret_key = "echodyne"
selected = {}

@app.route("/", methods=["POST", "GET"])
def login():
    session.clear()
    if request.method == "POST":
        user = request.form["nm"]
        if user != "":
            session["user"] = user
            return redirect(url_for("explore"))
    return render_template("login.html", name="Capture001")
    

@app.route("/explore", methods=["POST", "GET"])
def explore():
    if request.method == "POST":
        inputs = request.form.copy()
        if inputs.get("golabel") == "Label Images":
            return redirect(url_for("label"))
        remove = inputs.get("remove")
        if remove:
            del inputs['remove']
            if "live labeled" in remove:
                del selected['live labeled']
            elif "labeler" in remove:
                del selected['labeler']
            elif "label" in remove:
                del selected['label']
            elif "radar" in remove:
                del selected['radarsn']
            elif "camera" in remove:
                del selected['camerasn']
            elif "location" in remove:
                del selected['location']
            else:
                del selected['date']
        print(inputs)    
        if inputs.get("filter"):  
            del inputs['filter']
        for k in inputs:
            if inputs[k] != "":
                selected[k] = inputs[k]
        print(selected)
        session["tests"] = generateImages(selected) 
        return render_template("filter.html", name=session["user"] + " exploring", tests = session["tests"], selected = selected)
        
    else:
        if "user" in session:
            session["tests"] = generateFieldTests()
            return render_template("filter.html", name=session["user"] + " exploring", tests = session["tests"])
        else:
            return redirect(url_for("login"))


@app.route('/uploads/<name>')
def sendfiletest(name):
    test_url = "C:/Users/sdaga/Desktop/" + name + ".png"
    return send_file(test_url, mimetype='image/jpg')

@app.route("/label", methods=["POST", "GET"])
def label():
    if request.method == 'GET':
        if "tests" in session:
            if 'i' in session:
                session['i'] += 1
            else:
                session['i'] = 0
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
    tests = generateFieldTests()
    if len(list(inputs.values())) == 0:
        return tests
    select = []
    for test in tests:
        for v in inputs.values():
            if v in test:
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
                           [[label, "sid", True], [secondLabel, "akhil", False]], "RADARSNXXXX", "CAMERASNXXXX", "Capture001"])
    return fieldTests
  
if __name__ == "__main__":
    app.run(debug=True)