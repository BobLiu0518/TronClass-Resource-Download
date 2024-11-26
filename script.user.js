// ==UserScript==
// @name         畅课平台资源下载
// @namespace    https://bobliu.tech/
// @version      1.0.1
// @license      MIT
// @supportURL   https://github.com/BobLiu0518/TronClass-Resource-Download/issues
// @description  下载畅课（一网畅学）平台的课程资源，即使老师设置了不可下载～
// @author       BobLiu
// @match        https://*/course/*/learning-activity*
// @icon         https://1906.usst.edu.cn/static/assets/images/favicon-b420ac72.ico
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';
    let host = window.location.origin;
    let activityId = window.location.hash.replace('#/', '');
    let res = await fetch(
        `${host}/api/activities/${activityId}/upload_references`
    );
    let resources = await res.json();

    for (let id in resources.references) {
        let resource = resources.references[id];
        console.log(`[${parseInt(id) + 1}] ${resource.name}`);
    }

    window.downloadResource = function (id) {
        id = parseInt(id) - 1;
        console.log(`Downloading ${resources.references[id].name}...`);
        let downloadUrl = `${host}/api/uploads/reference/${resources.references[id].id}/blob`;
        window.open(downloadUrl, '_blank');
    };
    console.log('Execute downloadResource(n) to download!');
})();
