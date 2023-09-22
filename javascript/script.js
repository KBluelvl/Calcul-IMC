"use strict";
let firstModif = true;

function createTable() {
    let taille = Math.pow($("#taille").val(), 2);
    $("#poids1").append("moins de<br>" + Math.trunc(16.5 * taille));
    $("#poids2").append(Math.trunc(16.5 * taille) + " à " + Math.trunc(18.5 * taille));
    $("#poids3").append(Math.trunc(18.5 * taille) + " à " + Math.trunc(25.5 * taille));
    $("#poids4").append(Math.trunc(25.5 * taille) + " à " + Math.trunc(30 * taille));
    $("#poids5").append(Math.trunc(30 * taille) + " à " + Math.trunc(35 * taille));
    $("#poids6").append(Math.trunc(35 * taille) + " à " + Math.trunc(40 * taille));
    $("#poids7").append(Math.trunc(40 * taille) + " et plus");
}

function replaceTable() {
    let taille = Math.pow($("#taille").val(), 2);
    $("<td id=poids1>moins de<br>" + Math.trunc(16.5 * taille) + "</td>").replaceAll("#poids1");
    $("<td id=poids2>" + Math.trunc(16.5 * taille) + " à " + Math.trunc(18.5 * taille) + "</td>").replaceAll("#poids2");
    $("<td id=poids3>" + Math.trunc(18.5 * taille) + " à " + Math.trunc(25.5 * taille) + "</td>").replaceAll("#poids3");
    $("<td id=poids4>" + Math.trunc(25.5 * taille) + " à " + Math.trunc(30 * taille) + "</td>").replaceAll("#poids4");
    $("<td id=poids5>" + Math.trunc(30 * taille) + " à " + Math.trunc(35 * taille) + "</td>").replaceAll("#poids5");
    $("<td id=poids6>" + Math.trunc(35 * taille) + " à " + Math.trunc(40 * taille) + "</td>").replaceAll("#poids6")
    $("<td id=poids6>" + Math.trunc(40 * taille) + " et plus</td>").replaceAll("#poids7");

    if (localStorage.getItem("catégorie") != "") {
        $("tr").removeClass("stored");
        let catégorie = localStorage.getItem("catégorie");
        $("." + catégorie).addClass("stored");
    }
}

function afficherTable() {
    $("#btn1").click(function () {
        if (firstModif) {
            createTable();
            $("#nav-Calculatrice div").prepend("<p class=texte>Avec votre taille (" + $("#taille").val() + "m) et votre poids (" + $("#poids").val() + "kg)," +
                " Votre IMC est de " + calculIMC().toFixed(1) + " et est considéré comme " + description())
            firstModif = false;

            $("div").removeClass("hide");
        }
        else {
            replaceTable();
            $("<p class=texte>Avec votre taille (" + $("#taille").val() + "m) et" +
                " votre poids (" + $("#poids").val() + "kg), Votre IMC est de " + calculIMC().toFixed(1) +
                " et est considéré comme " + description() + "</p>").replaceAll(".texte");
        }
    })
}

function calculIMC() {
    return $("#poids").val() / Math.pow($("#taille").val(), 2);
}

function description() {
    let imc = calculIMC();

    if (imc < 16.5) {
        $(".myIMC").removeClass("myIMC");
        $(".dénutrition").addClass("myIMC");
        return "dénutrition";
    }
    else if (imc < 18.5) {
        $(".myIMC").removeClass("myIMC");
        $(".maigreur").addClass("myIMC");
        return "maigreur";
    }
    else if (imc < 25) {
        $(".myIMC").removeClass("myIMC");
        $(".poidsNormal").addClass("myIMC");
        return "poids normal";
    }
    else if (imc < 30) {
        $(".myIMC").removeClass("myIMC");
        $(".surpoids").addClass("myIMC");
        return "surpoids";
    }
    else if (imc < 35) {
        $(".myIMC").removeClass("myIMC");
        $(".obésitéModérée").addClass("myIMC");
        return "obésité modérée";
    }
    else if (imc < 40) {
        $(".myIMC").removeClass("myIMC");
        $(".obésitéSévère").addClass("myIMC");
        return "obésité sévère";
    }
    else {
        $(".myIMC").removeClass("myIMC");
        $(".obésitéMorbide").addClass("myIMC");
        return "obésité morbide ou massive"
    }
}

function calculPoids() {
    return calculIMC() * Math.pow($("#taille").val(), 2);
}

function storage() {
    $(".btn2").click(function () {

        switch (description()) {
            case "dénutrition":
                localStorage.setItem("catégorie", "dénutrition");
                break;
            case "maigreur":
                localStorage.setItem("catégorie", "maigreur");
                break;
            case "poids normal":
                localStorage.setItem("catégorie", "poidsNormal");
                break;
            case "surpoids":
                localStorage.setItem("catégorie", "surpoids");
                break;
            case "obésité modérée":
                localStorage.setItem("catégorie", "obésitéModérée");
                break;
            case "obésité sévère":
                localStorage.setItem("catégorie", "obésitéSévère");
                break;
            case "obésité morbide ou massive":
                localStorage.setItem("catégorie", "obésitéMorbide");
        }
    })

}

function infoAge() {
    $(".btn3").click(function () {
        $("#test").remove();
        displayAge();
        let ageUtil = $("#age1").val();
        if (ageUtil < 18) {
            $("#mineur").addClass("monAge");
        }
        else if (ageUtil >= 18 && ageUtil <= 60) {
            $("#adulte").addClass("monAge");
        }
        else {
            $("#senior").addClass("monAge");
        }
    }); 
}


function displayAge() {
    $("#ageTab").append("<div id='test'><div id='mineur'>Mineur (moins de 18 ans)</div><div id='adulte'>Adulte (entre 18 et 60 ans)</div><div id='senior'>Senior (plus de 60 ans)</div></div>");
}

$(document).ready(function () {
    afficherTable();
    storage();
    infoAge();
});