export const generateID = function() {
    let globalIdCounter = 0;
    return function (baseStr) {
        baseStr = baseStr ? baseStr : "generatedID-";
        var newString = baseStr + globalIdCounter++;
        if (document.getElementById("#" + newString)) {
            newString = newString + parseInt(Math.random() * 10000000000);
        }
        return newString;
    };
}();

export function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}

export function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}