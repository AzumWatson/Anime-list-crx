const ul = document.querySelector('.page-numbers');
const button = ul.querySelectorAll('li');
const section = document.querySelector('#divdiv');
const about  = document.querySelector('#about');
const aboutblack  = document.querySelector('#aboutblack');
const aboutinfo  = document.querySelector('#aboutinfo');
const banguminfo = document.querySelector('#banguminfo');

const date = new Date();
const day = date.getDay();
const days = [6,0,1,2,3,4,5]

const bg = chrome.extension.getBackgroundPage();

const data = bg.data;
const aboutdata = bg.aboutdata;
const arraaa = bg.arraaa;
const arrbbb = bg.arrbbb;
const arrccc = bg.arrccc;
const ss = bg.ss;

console.log(bg.a);
console.log(section);

for(let i=0;i<button.length;i++){
    button[i].id = i+1;
    button[i].onclick = bangumi;
}

if(aboutdata != undefined && aboutdata.version != "1.0.0"){
    aboutinfo.style.display = "block";

    // 点击条目显示条目详细介绍
    banguminfo.innerHTML = `
    <header class="l-spacer_mg_b_l1"><h1 class="c-txt-size_l4 u-mg_b_none u-mg_t_none u-ft-fml_noto-serif-regular u-cl_pink">插件已有新版本</h1></header>
    <p><a target="_blank" href="${aboutdata.repourl}">前往更新！！</a></p>
    `;
}

function bangumi(){
    let dayss = this.id;

    for(let i=0;i<button.length;i++){
      button[i].children[0].className = "page-numbers";
    }

    this.children[0].className = "page-numbers current";

    // 排他法，每点击一次就将div标签清空
    divdiv.innerHTML = "";

    if(data == undefined && ss == 0){
        aboutinfo.style.display = "block";

        // 点击条目显示条目详细介绍
        banguminfo.innerHTML = `
        <header class="l-spacer_mg_b_l1"><h1 class="c-txt-size_l4 u-mg_b_none u-mg_t_none u-ft-fml_noto-serif-regular u-cl_pink">无法获取到番剧数据</h1></header>
        <p>请查看您的网络是否正常再重新打开浏览器试试看。</p>
        `;
    }
    
    for(let k in data){
        
        let datas = data[k].items;

        if(data[k].weekday.id == dayss){
            for(let kk in datas){

                // let broadcast;

                // for(let i=0;i<arraaa.length;i++){
                //     if(datas[kk].id == arraaa[i]){
                //         broadcast = arrbbb[i];
                //         break;
                //     }
                // }

                const article = document.createElement('article');
                divdiv.appendChild(article);
                article.className = "c-news-list__item";

                // 判断时间是否为空,为空则是特殊番剧(通常是一次性更新完毕)
                if(datas[kk].time){
                    const span = document.createElement('span');

                    article.appendChild(span);
    
                    span.className = "c-news-item__title c-news-item"
    
                    //   let datarr = datas[kk].name_cn.split("～");
    
                    //   console.log(datarr);
                        
                    span.innerHTML = datas[kk].name + `<span class="c-news-item__day c-article-day">${datas[kk].time}</span>`;
                    
                    console.log(datas[kk].bgminfo);

                    if(datas[kk].bgminfo != undefined && datas[kk].img != undefined){
                        
                        span.onclick = ()=>{
                            console.log("12312312");
                            aboutinfo.style.display = "block";

                            // 点击条目显示条目详细介绍
                            banguminfo.innerHTML = `
                            <header class="l-spacer_mg_b_l1"><h1 class="c-txt-size_l4 u-mg_b_none u-mg_t_none u-ft-fml_noto-serif-regular u-cl_pink">${datas[kk].name}</h1><p class="u-ft-sz_s1 u-mg_b_none">${datas[kk].name_jp}</p></header>
                            <img src="${datas[kk].img.large}" alt="" class="" style="width:600px"><p></p>
                            <p>${datas[kk].bgminfo}</p>
                            `;
                        }
                    }else if(datas[kk].bgminfo != undefined && datas[kk].img == undefined){
                        span.onclick = ()=>{
                            console.log("12312312");
                            aboutinfo.style.display = "block";

                            // 点击条目显示条目详细介绍
                            banguminfo.innerHTML = `
                            <header class="l-spacer_mg_b_l1"><h1 class="c-txt-size_l4 u-mg_b_none u-mg_t_none u-ft-fml_noto-serif-regular u-cl_pink">${datas[kk].name}</h1><p class="u-ft-sz_s1 u-mg_b_none">${datas[kk].name_jp}</p></header>
                            <p>${datas[kk].bgminfo}</p>
                            `;
                        }
                    }else{
                        span.onclick = ()=>{
                            aboutinfo.style.display = "block";

                            // 点击条目显示条目详细介绍
                            banguminfo.innerHTML = `
                            <header class="l-spacer_mg_b_l1"><h1 class="c-txt-size_l4 u-mg_b_none u-mg_t_none u-ft-fml_noto-serif-regular u-cl_pink">${datas[kk].name}</h1></header>
                            <p>目前没有该番剧的数据，<a target="_blank" href = "https://bgm.tv/subject_search/${datas[kk].name}?cat=all">前往 Bangumi 番组计划 查看详情</a></p>
                            `;
                        }
                    }

                    // 点击条目显示详细图片存在bug
                    // article.onclick = ()=>{
                    //     if(onclickphoto){ 
                    //         console.log("123123");
                    //         onclickphoto = 0;
                    //         document.querySelector("img").remove()
                    //     }else{
                    //         console.log("123123123");
                    //         onclickphoto = 1;
                    //         article.innerHTML += `<img src="http://lain.bgm.tv/pic/cover/l/5d/f2/312311_A9y9s.jpg" style="width:380px;padding-top: 15px;">`;
                    //     }
                    // }
                }
            }
        }
    }
}

aboutblack.addEventListener('click',()=>{
    aboutinfo.style.display = "none";

});

about.addEventListener('click',()=>{
    aboutinfo.style.display = "block";
    if(aboutdata != undefined){
        banguminfo.innerHTML = `
        <header class="l-spacer_mg_b_l1"><h1 class="c-txt-size_l4 u-mg_b_none u-mg_t_none u-ft-fml_noto-serif-regular u-cl_pink">${aboutdata.name}</h1></header>
        <p>一个查看每日番剧的 浏览器拓展 / 插件</p>
        <p>番剧数据是使用 <a target="_blank" href = "https://github.com/AzumWatson/anime-data">AzumWatson/anime-data</a> 的数据</p>
        <p>前端页面 参考 『<a target="_blank" href = "https://yofukashi-no-uta.com/">よふかしのうた</a>』 (彻夜之歌) 的 TV 官网页面</p>
        <p>该项目已在 Github 上开源，<a target="_blank" href = "${aboutdata.repourl}">进入仓库页面</a></p>
        <p class="u-cl_pink">如果有发现 Bug 请在 Github 上发起 Issues,也可以点击下面按钮邮件联系我</p><div id="aboutblack" class="c-btn c-btn--frame" data-active="" style="margin: 14 auto;" div="">
        <a href=mailto:${aboutdata.email}><span class="c-btn--frame__frame"></span>提交问题</a>
        </div>
        `;
    }else{
        banguminfo.innerHTML = `
        <header class="l-spacer_mg_b_l1"><h1 class="c-txt-size_l4 u-mg_b_none u-mg_t_none u-ft-fml_noto-serif-regular u-cl_pink">番剧时间表</h1></header>
        <p>一个查看每日番剧的 浏览器拓展 / 插件</p>
        <p>番剧数据是使用 <a target="_blank" href = "https://github.com/AzumWatson/anime-data">AzumWatson/anime-data</a> 的数据</p>
        <p>前端页面 参考 『<a target="_blank" href = "https://yofukashi-no-uta.com/">よふかしのうた</a>』 (彻夜之歌) 的 TV 官网页面</p>
        <p>该项目已在 Github 上开源，<a target="_blank" href = "https://github.com/azumwatson/anime-list-crx">进入仓库页面</a></p>
        <p class="u-cl_pink">如果有发现 Bug 请在 Github 上发起 Issues,也可以点击下面按钮邮件联系我</p><div id="aboutblack" class="c-btn c-btn--frame" data-active="" style="margin: 14 auto;" div="">
        <a href=mailto:kelulululu@outlook.com><span class="c-btn--frame__frame"></span>提交问题</a>
        </div>
        `;
    }
});

button[days[day]].children[0].innerHTML = "今天";
button[days[day]].click();