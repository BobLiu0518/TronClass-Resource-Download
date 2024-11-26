// ==UserScript==
// @name         畅课平台资源下载
// @namespace    https://bobliu.tech/
// @version      1.1.1
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

    let inject = async function (retry) {
        if (typeof retry == 'object') retry = 0;
        let dom = document.getElementsByClassName('attachment-body')[0];
        if (!dom) {
            if (retry < 5) {
                console.log('Cannot get file list dom, retrying in 1s...');
                setTimeout(() => inject(retry + 1), 1000);
            } else {
                console.log('Cannot get file list dom, inject button failed.');
            }
            return;
        }
        let fileList = dom.children;

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
                    row.children[0].appendChild(downloadBtn);
                    break;
                }
            }
        }
        console.log('Download button injected.');
    };

    addEventListener('load', inject);
})();
