'use strict';
document.addEventListener('DOMContentLoaded', event => {
    PatternLock();
});
function PatternLock() {
    const dot1 = document.getElementById('dot1');
    const dot2 = document.getElementById('dot2');
    const dot3 = document.getElementById('dot3');
    const dot4 = document.getElementById('dot4');
    const dot5 = document.getElementById('dot5');
    const dot6 = document.getElementById('dot6');
    const dot7 = document.getElementById('dot7');
    const dot8 = document.getElementById('dot8');
    const dot9 = document.getElementById('dot9');
    const newdots = [dot1, dot2, dot3, dot4, dot5, dot6, dot7, dot8, dot9];
    let ciphertext;
    var svg = document.getElementById('lock');
    var dots = document.getElementsByTagName('circle');
    var lines = document.getElementById('lock-lines');
    var actives = document.getElementById('lock-actives');
    var pt = svg.createSVGPoint();
    var code = [];
    var currentline = void 0;
    var currenthandler = void 0;
    var publickey;
    var privatekey;
    svg.addEventListener('mousedown', function (e) {
        clear();
        e.preventDefault();
        svg.addEventListener('mousemove', discoverDot);
        var endEvent = 'mouseup';
        document.addEventListener(endEvent, function (e) {
            end();
        });
    });

    function success() {
        svg.classList.remove("error");
        svg.classList.add("success");
    }

    function error() {
        svg.classList.remove("success");
        svg.classList.add("error");
    }

    function end() {
        stopTrack(currentline);
        svg.removeEventListener('mousemove', discoverDot);
        //console.log(getCoordinates());
        //console.log(encode(getCoordinates()));
        if (getCoordinates() !== NaN) {
            encryptMessage(publickey);
        }
        if (getCoordinates() !== NaN) {
            window.setTimeout(decryptMessage, 5 * 1000, privatekey);
        }
    }

    function clear() {
        code = [];
        currentline = undefined;
        currenthandler = undefined;
        svg.classList.remove("success");
        while (lines.firstChild) {
            lines.removeChild(lines.firstChild);
        }
        while (actives.firstChild) {
            actives.removeChild(actives.firstChild);
        }
        svg.classList.remove("error");
    }

    function isUsed(target) {
        for (var i = 0; i < code.length; i++) {
            if (code[i] === target) {
                return true;
            }
        }
        return false;
    }

    function isAvailable(target) {
        for (var i = 0; i < dots.length; i++) {
            if (dots[i] === target) {
                return true;
            }
        }
        return false;
    }

    function updateLine(line) {
        return function (e) {
            e.preventDefault();
            if (currentline !== line) return;
            var pos = svgPosition(e);
            line.setAttribute('x2', pos.x);
            line.setAttribute('y2', pos.y);
            return false;
        };
    }

    function discoverDot(e, target) {
        if (!target) {
            var loc = getMousePos(e),
                x = loc.x,
                y = loc.y;

            target = document.elementFromPoint(x, y);
        }
        if (isAvailable(target) && !isUsed(target)) {
            stopTrack(currentline, target);
            currentline = beginTrack(target);
        }
    }

    function stopTrack(line, target) {
        if (line === undefined) return;
        if (currenthandler) {
            svg.removeEventListener('mousemove', currenthandler);
        }
        if (target === undefined) {
            line.setAttribute('x2', line.getAttribute('x1'));
            line.setAttribute('y2', line.getAttribute('y1'));
            return;
        }
        var x = target.getAttribute('cx');
        var y = target.getAttribute('cy');

        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
    }

    function beginTrack(target) {
        code.push(target);
        var x = target.getAttribute('cx');
        var y = target.getAttribute('cy');
        var line = createNewLine(x, y);
        var marker = createNewMarker(x, y);
        actives.append(marker);
        currenthandler = updateLine(line);
        svg.addEventListener('mousemove', currenthandler);
        lines.append(line);
        return line;
    }

    function createNewMarker(x, y) {
        var marker = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        marker.setAttribute('cx', x);
        marker.setAttribute('cy', y);
        marker.setAttribute('r', 6);
        return marker;
    }

    function createNewLine(x1, y1, x2, y2) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', "line");
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        if (x2 === undefined || y2 == undefined) {
            line.setAttribute('x2', x1);
            line.setAttribute('y2', y1);
        } else {
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
        }
        return line;
    }

    function getMousePos(e) {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }

    function svgPosition(e) {
        var loc = getMousePos(e),
            x = loc.x,
            y = loc.y;

        pt.x = x; pt.y = y;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    }
    function getCoordinates() {
        return parseInt(code.map(function (i) {
            for (var j = 0; j < newdots.length; j++) {
                if (newdots[j] === i) {
                    return (j + 1);
                }
            }
        }).join(''));
    }
    function tobase64(s) {
        return window.btoa(s);
    }
    function base64to(s) {
        return window.atob(s);
    }
    function encode(pattern) {
        let enc = new TextEncoder();
        return enc.encode(pattern);
    }
    async function encryptMessage(key) {
        let encoded = encode(tobase64(getCoordinates()));
        ciphertext = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            key,
            encoded
        );

        let buffer = new Uint8Array(ciphertext, 0, 5);
        //console.log(`${buffer}...[${ciphertext.byteLength} bytes total]`);
    }
    async function decryptMessage(key) {
        let decrypted = await window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            key,
            ciphertext
        );

        let dec = new TextDecoder();
        let d = base64to(dec.decode(decrypted));
        //console.log(d);
        if (d == 1234) {
            success();
            window.location.href = "uos.html";
        } else {
            error();
        }
    }

    window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",//2048
            // Consider using a 4096-bit key for systems that require long-term security
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    ).then((keyPair) => {
        publickey = keyPair.publicKey;
        privatekey = keyPair.privateKey;
    });
}
