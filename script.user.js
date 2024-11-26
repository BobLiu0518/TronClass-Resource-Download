// ==UserScript==
// @name         畅课平台资源下载
// @namespace    https://bobliu.tech/
// @version      1.1.0
// @license      MIT
// @supportURL   https://github.com/BobLiu0518/TronClass-Resource-Download/issues
// @description  下载畅课（一网畅学）平台的课程资源，即使老师设置了不可下载～
// @author       BobLiu
// @match        https://*/course/*/learning-activity*
// @icon         https://tronclass.com.cn/favicon.ico
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';
    let host = window.location.origin;
    let activityId = window.location.hash.replace('#/', '');
    let res = await fetch(
        `${host}/api/activities/${activityId}/upload_references`
    );
    let resources = (await res.json()).references;

    if (!resources.length) {
        console.log('No resources found.');
        return;
    }

    for (let id in resources) {
        let resource = resources[id];
        console.log(`[${parseInt(id) + 1}] ${resource.name}`);
    }
    console.log('Execute downloadResource(n) to download!');

    window.downloadResource = function (i) {
        i = parseInt(i) - 1;
        console.log(`Downloading ${resources[i].name}...`);
        let downloadUrl = `${host}/api/uploads/reference/${resources[i].id}/blob`;
        window.open(downloadUrl, '_blank');
    };

    window.onload = function () {
        let fileList =
            document.getElementsByClassName('attachment-body')[0].children;
        for (let row of fileList) {
            let filename = row.children[0].children[0].textContent
                .replaceAll(/\s*\n\s*/g, '')
                .trim();
            for (let i in resources) {
                let resource = resources[i];
                if (filename == resource.name) {
                    let downloadBtn = document.createElement('button');
                    downloadBtn.textContent = '下载';
                    downloadBtn.onclick = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        window.downloadResource(parseInt(i) + 1);
                    };
                    row.appendChild(downloadBtn);
                    break;
                }
            }
        }
    };
})();
