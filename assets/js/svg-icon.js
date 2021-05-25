
/**
 * author: Thiago Pereira Idehama
 * version: 1.00
 * 2021-05-24
 */

export class SvgIcon {
    constructor(path) {
        if (path) {
            this.path = path;
            this.init();
        }
    }
    
    async resource(file) {
        const dataInit = {
            method: 'GET',
        };
        const res = await fetch(file, dataInit)
        return res;
    }

    async init() {
        const icons = document.querySelectorAll('svg-icon');
        //
        icons.forEach((elem) => {
            const fileName = `${elem.getAttribute('file-name')}.svg`;
            const filePath = `${this.path}/${fileName}`;
            const style = elem.getAttribute('style');
            let svgClass = elem.getAttribute('class');
    
            this.resource(filePath)
            .then(res => res.text())
            .then((r) => {
                elem.insertAdjacentHTML('afterend', r);
                if (svgClass) {
                    svgClass = svgClass.trim();
                    svgClass = svgClass.split(' ');

                    svgClass.forEach(el => {
                        elem.nextElementSibling.classList.add(el);
                    });
                } else {
                    elem.nextElementSibling.classList.add('svg-icon');
                }

                // setting viewBox attribute
                const viewBox = elem.nextElementSibling.getAttribute('viewBox');
                if (!viewBox) {
                    const width = elem.nextElementSibling.getAttribute('width');
                    const height = elem.nextElementSibling.getAttribute('height');
            
                    if (width && height) elem.nextElementSibling.setAttribute('viewBox', `0 0 ${width} ${height}`);
                }
                
                if (style) elem.nextElementSibling.style.cssText = style;
                elem.remove();
            });
        });
    }
}

// new SvgIcon('assets/images/svg');


// const template = `
//     <svg class="${svgClass()}" aria-hidden="true">
//         <use :xlink:href="${iconName()}" />
//     </svg>
// `;

// function iconName(iconClass) {
//     return `#icon-${iconClass}`;
// }

// function svgClass(className) {
//     if (className) {
//       return 'svg-icon ' + className;
//     } else {
//       return 'svg-icon';
//     }
// }


// async function resource(file) {
//     const dataInit = {
//         method: 'GET',
//     };
//     const res = await fetch(file, dataInit)
//     return res;
// }

// async function init() {
//     const icons = document.querySelectorAll('svg-icon');
//     console.info(template);
//     //
//     icons.forEach((elem) => {
//         const path = 'assets/images/svg'
//         const fileName = `${elem.getAttribute('file-name')}.svg`;
//         const filePath = `${path}/${fileName}`;
//         const style = elem.getAttribute('style');
//         let svgClass = elem.getAttribute('class');
//         svgClass = svgClass.trim();
//         svgClass = svgClass.split(' ');

//         const el = elem;

//         resource(filePath)
//         .then(res => res.text())
//         .then((r) => {
//             // const parser = new DOMParser();
//             // const svgObject = parser.parseFromString(r, 'image/svg+xml');
//             // const svgObject = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//             // svgObject.svgClass = svgClass;
//             console.log(elem)
            
//             elem.insertAdjacentHTML('afterend', r);
//             svgClass.forEach(el => {
//                 console.log(el);
//                 elem.nextElementSibling.classList.add(el);
//                 elem.nextElementSibling.style.cssText = style;
//             });
//             // elem.nextElementSibling.className = svgClass;
//             elem.remove();
//         });

//         // console.info(elem.getAttribute('file-name'));
//         // console.info(elem.getAttribute('class'));
//     });
// }

// init();
// document.addEventListener('DOMContentLoaded', function(){
    
// });