const url = "https://api.qrserver.com/v1/create-qr-code/";
const size = 480;
const destinationUrl = 'https://oofpez.github.io/timetables/index.html?stopid=';

function getQrCodeUrl (value) {
    let target = destinationUrl + value;
    target = encodeURI(target);
    let rawUrl = `${url}?size=${size}x${size}&data=${target}`;
    return encodeURI(rawUrl);
}