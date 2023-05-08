const labels = [
    "_unknown",
    "airborne",
    "airborne.airliner",
    "airborne.airliner.jet",
    "airborne.airliner.propeller",
    "airborne.bird",
    "airborne.bird.covey",
    "airborne.bird.covey.large_birds",
    "airborne.bird.covey.small_birds",
    "airborne.bird.flock",
    "airborne.bird.flock.large_birds",
    "airborne.bird.flock.small_birds",
    "airborne.bird.single",
    "airborne.bird.single.large",
    "airborne.bird.single.small",
    "airborne.helicopter",
    "airborne.misc",
    "airborne.misc.mylar_balloon",
    "airborne.plane",
    "airborne.plane.light",
    "airborne.plane.light.cessna",
    "airborne.plane.light.lancair",
    "airborne.plane.light.seaplane",
    "airborne.plane.military_jet",
    "airborne.plane.ultralight",
    "airborne.plane.ultralight.balloon",
    "airborne.plane.ultralight.glider",
    "airborne.plane.ultralight.paramotor",
    "airborne.plane.ultralight.propeller",
    "airborne.projectile",
    "airborne.projectile.golf_ball",
    "airborne.projectile.thrown_object",
    "airborne.projectile.thrown_object.football",
    "airborne.projectile.thrown_object.medicine_ball",
    "airborne.projectile.thrown_object.tennis_ball",
    "airborne.uas",
    "airborne.uas.fixed_wing",
    "airborne.uas.fixed_wing.medium",
    "airborne.uas.fixed_wing.micro",
    "airborne.uas.fixed_wing.micro.defiant_42",
    "airborne.uas.fixed_wing.micro.mini_talon",
    "airborne.uas.fixed_wing.micro.nano_talon",
    "airborne.uas.fixed_wing.micro.opterra_2m",
    "airborne.uas.fixed_wing.micro.parrot_disco",
    "airborne.uas.fixed_wing.mini",
    "airborne.uas.fixed_wing.small",
    "airborne.uas.fixed_wing.x_large",
    "airborne.uas.fixed_wing.x_large.aai_shadow",
    "airborne.uas.helicopter",
    "airborne.uas.helicopter.medium",
    "airborne.uas.helicopter.micro",
    "airborne.uas.helicopter.mini",
    "airborne.uas.helicopter.small",
    "airborne.uas.multirotor",
    "airborne.uas.multirotor.medium",
    "airborne.uas.multirotor.medium.bell_apt",
    "airborne.uas.multirotor.micro",
    "airborne.uas.multirotor.micro.autel_evo",
    "airborne.uas.multirotor.micro.firefly_show",
    "airborne.uas.multirotor.micro.flywheel_550",
    "airborne.uas.multirotor.micro.FPV",
    "airborne.uas.multirotor.micro.holybro_S500",
    "airborne.uas.multirotor.micro.holybro_X500",
    "airborne.uas.multirotor.micro.mavic",
    "airborne.uas.multirotor.micro.mavic_mini",
    "airborne.uas.multirotor.micro.mavic_ppt",
    "airborne.uas.multirotor.micro.mavic_v1",
    "airborne.uas.multirotor.micro.mavic_v3",
    "airborne.uas.multirotor.micro.phantom4",
    "airborne.uas.multirotor.micro.phantom4_adv",
    "airborne.uas.multirotor.micro.swellpro",
    "airborne.uas.multirotor.mini",
    "airborne.uas.multirotor.mini.inspire",
    "airborne.uas.multirotor.mini.swellpro4",
    "airborne.uas.multirotor.small",
    "airborne.uas.multirotor.small.matrice200",
    "airborne.uas.multirotor.small.matrice600",
    "analysis",
    "analysis.noclassify",
    "analysis.user_1",
    "analysis.user_2",
    "clutter",
    "clutter.air_to_ground",
    "clutter.plants",
    "clutter.plants.brush",
    "clutter.plants.trees",
    "clutter.rain",
    "clutter.snow",
    "clutter.sprinklers",
    "clutter.structure",
    "clutter.structure.manmade",
    "clutter.structure.manmade.building",
    "clutter.structure.manmade.hvac",
    "clutter.structure.manmade.tower",
    "clutter.structure.manmade.windmill",
    "clutter.structure.natural",
    "clutter.structure.natural.canyon",
    "clutter.waves",
    "clutter.waves.boat_wake",
    "ground",
    "ground.animal",
    "ground.animal.human",
    "ground.animal.human.group_humans",
    "ground.animal.human.one_human",
    "ground.animal.quadruped",
    "ground.bicycle",
    "ground.bicycle.group_bikes",
    "ground.bicycle.one_bike",
    "ground.motor_vehicle",
    "ground.motor_vehicle.large",
    "ground.motor_vehicle.large.bus",
    "ground.motor_vehicle.large.semitruck",
    "ground.motor_vehicle.medium",
    "ground.motor_vehicle.medium.car",
    "ground.motor_vehicle.medium.light_pickup",
    "ground.motor_vehicle.medium.tractor",
    "ground.motor_vehicle.small",
    "ground.motor_vehicle.small.motorcycle",
    "test",
    "test.arts",
    "test.corner_reflector",
    "test.corner_reflector.cr_bicycle",
    "test.corner_reflector.cr_walker",
    "test.waveguide_spinner",
    "watercraft",
    "watercraft.ferry",
    "watercraft.freighter",
    "watercraft.kayak",
    "watercraft.powerboat",
    "watercraft.sailboat"
    ]; 

function filterDropDown(dropdown, input, items) {
    //Create dropdown items from a list of items
    for (let i=0; i<items.length; i++) {
        let dropdown_item = document.createElement('a');
        dropdown_item.setAttribute('href', '#'+items[i]);
        dropdown_item.setAttribute('class', 'dropdown-item');
        dropdown_item.innerHTML = items[i];
        dropdown.appendChild(dropdown_item);
        dropdown_item.addEventListener('click', function () {
            input.value = items[i]
        });
        dropdown_item.style.display = 'none';
    }

    // input.addEventListener('click', function () {
    //     for (let i=0; i<items.length; i++) {
    //         dropdown_items[i].style.display = 'block';
    //     }
    // });


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

//Call filterDropDown function
filterDropDown(
    document.getElementById('dropdown'),
    document.getElementById('input'),
    labels
)