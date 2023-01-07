const date = new Date();
const day = date.getDay();
const days = [6, 0, 1, 2, 3, 4, 5]

var data;
var datass;
var lengths;
var daten;
var aboutdata;

var arraaa = [];
var arrbbb = [];
var arrccc = [];

// var ss = 100;

// bgmtime();
bgmapi("raw.githubusercontent.com");
newVersion();


// function bgmapi() {
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 data = xhr.response;
//                 console.log(data);
//             } else {
//                 ss--;
//                 console.log("再次尝试连接" + ss);
//                 if (ss) {
//                     setTimeout(bgmapi, 400);
//                 }
//             } data
//         }
//     }

//     xhr.open('GET', 'https://raw.githubusercontent.com/AzumWatson/anime-data/main/data.json');
//     xhr.send();
// }

function bgmapi(host) {
    // console.log("test", host)
    fetch(`https://${host}/AzumWatson/anime-data/main/data.json`)
        .then(res => res.json())
        .then(res => {
            data = res
            console.log(res)
        })
        .catch(res => {
            if (host === "raw.githubusercontent.com") {
                console.log("数据请求失败 尝试国内镜像")
                bgmapi("raw.fastgit.org")
            }
        })
}

// function newVersion() {
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 aboutdata = xhr.response;
//             } else {
//                 ss--;
//                 console.log("再次尝试连接" + ss);
//                 if (ss) {
//                     setTimeout(bgmapi, 400);
//                 }
//             }
//         }
//     }

//     xhr.open('GET', 'https://raw.githubusercontent.com/AzumWatson/Anime-list-crx/about/about.json');
//     xhr.send();
// }

async function newVersion() {
    const a = await fetch("https://raw.githubusercontent.com/AzumWatson/Anime-list-crx/about/about.json")
    const b = await a.json()
    aboutdata = b
    console.log(b)
}



// 旧的api已经不许药了
function bgmtime() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                datass = xhr.response;
                lengths = datass.length;
                console.log(lengths);

                for (let i = 0; i < lengths; i++) {
                    arraaa[i] = datass[i].sites[0].id;
                    arrbbb[i] = editdate(datass[i].broadcast);
                    arrccc[i] = datass[i].title;
                }

                console.log(datass);
            }
        }
    }

    xhr.open('GET', 'https://raw.githubusercontent.com/bangumi-data/bangumi-data/master/data/items/2022/07.json');
    xhr.send();
}

function editdate(date) {
    const arrrr = ['08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, '00', '01', '02', '03', '04', '05', '06', '07'];
    let dates = date.split('/');
    if (dates[2] == "P7D") {
        let datess = dates[1].split('T');
        let datesss = datess[1].split('.');
        let datessss = datesss[0].split(':');

        // console.log(arrrr[datessss[0]] + ':' + datessss[1]);

        daten = arrrr[datessss[0]] + ':' + datessss[1];
        return daten;
    }
}
