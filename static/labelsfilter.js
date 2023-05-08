const devices = ['Desktops', 'Laptops', 'Tablets', 'Mobile phones', 'Smart watches', 'Gaming consoles', 'Hand-held consoles'];

function filterDropDown(button, dropdown, input, items) {
    //create dropdown items from list of items
    for (let i=0; i<items.length; i++) {
        let dropdown_item = document.createElement('a');
        dropdown_item.setAttribute('href', '#'+items[i]);
        dropdown_item.setAttribute('class', 'dropdown-item');
        dropdown_item.innerHTML = items[i];
        dropdown.appendChild(dropdown_item);
    }
    //hide the dropdown list
    dropdown.style.display = 'none';

    //make the button toggle the display of dropdown
    button.addEventListener('click', function () {
        if (dropdown.style.display == 'none')
            dropdown.style.display = 'block';
        else
            dropdown.style.display = 'none';
    });

    input.addEventListener('input', function () {
        let dropdown_items = dropdown.querySelectorAll('.dropdown-item');
        if (!dropdown_items)
            return false;
        for (let i=0; i<dropdown_items.length; i++) {
            if (dropdown_items[i].innerHTML.toUpperCase().includes(input.value.toUpperCase()))
                dropdown_items[i].style.display = 'block';
            else
                dropdown_items[i].style.display = 'none';
        }
    });
}

//call filterDropDown function
filterDropDown(
    document.getElementById('toggle'),
    document.getElementById('dropdown'),
    document.getElementById('input'),
    devices
)