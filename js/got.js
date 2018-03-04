function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 
      */
    document.getElementById('myButton').addEventListener("click", function () {
        search(userDatas)
    });
    filterData(userDatas);
    /*
      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

//kell egy sort függvény az elejére!!

function search(taplalek) {
    var eredmeny = taplalek.filter(srch);
    console.log(eredmeny);
    if (eredmeny.length < 1) {
        document.querySelector('#search').value = "Character not found"
    } else {
        loadData(eredmeny[0]);
    }
}

function srch(userDatas) {
    console.log(document.querySelector('#search').value);
    return userDatas.name == document.querySelector('#search').value;
}
/*function search(inputArray) {
    var eredmenyArray = inputArray.filter(() => inputArray.name == document.getElementById('search'));
    if (eredmenyArray.length = 1) {
        loadData(eredmenyArray);
    } else {
        document.getElementById(search).value = 'Character not found';
    }
}*/

function check(userDatas) {
    return userDatas.dead == '';
}

function filterData(userDatas) {
    var eredmeny = userDatas.filter(check);
    eredmeny.sort((a, b) => (a.name < b.name) ? -1 : 1);
    generate(eredmeny);
}

function generate(taplalek) {
    var container = document.createElement('div');
    for (i in taplalek) {
        var div = document.createElement('div');
        div.setAttribute("class", "avatar");
        div.setAttribute("id", `${taplalek[i].name}`)
        div.addEventListener('click', function () {
            selectCharacter(taplalek, this.id);
        });
        div.innerHTML = `<img src="/${taplalek[i].portrait}" alt="${taplalek[i].name}"><p>${taplalek[i].name}</p>`;
        container.appendChild(div)
    }
    document.querySelector('.content').appendChild(container);
}

function selectCharacter(taplalek, feltetel) {
    var result;
    console.log(feltetel);
    for (var i in taplalek) {
        console.log(taplalek[i].name);
        console.log(feltetel);
        if (feltetel === taplalek[i].name) {
            result = taplalek[i];
        }
        /*else {
                   document.querySelector('#search').value = "Character not found"
               }*/
    }
    loadData(result);
}

function loadData(hero) {
    document.querySelector('.img').innerHTML = `<img src="/${hero.picture}" alt="${hero.name}">`;
    document.querySelector('.name').innerHTML = `${hero.name}`;
    document.querySelector('.bio').innerHTML = `${hero.bio}`;
    switch (hero.house) {
        case 'stark':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/stark.png" alt="${hero.house}">`;
            break;
        case 'baratheon':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/baratheon.png" alt="${hero.house}">`;
            break;
        case 'clegane':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/clegane.png" alt="${hero.house}">`;
            break;
        case 'greyjoy':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/greyjoy.png" alt="${hero.house}">`;
            break;
        case 'lannister':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/lannister.png" alt="${hero.house}">`;
            break;
        case 'mormont':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/mormont.png" alt="${hero.house}">`;
            break;
        case 'targaryen':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/targaryen.png" alt="${hero.house}">`;
            break;
        case 'tarly':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/tarly.png" alt="${hero.house}">`;
            break;
        case 'tully':
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/tully.png" alt="${hero.house}">`;
            break;
        default:
            document.querySelector('.ico').innerHTML = `<img src="/assets/houses/DButt.jpg" alt="potato">`;
    }

}