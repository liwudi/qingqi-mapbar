import { Keyboard } from 'react-native';

import Toast from '@remobile/react-native-toast';


let keyboardIsShow = false;

Keyboard.addListener('keyboardDidShow', () => {
    keyboardIsShow = true;
});
Keyboard.addListener('keyboardDidHide', () => {
    keyboardIsShow = false;
});

let keyword = 'Network request failed'.toLowerCase();

function processer(msg) {
    msg = msg.toLowerCase();
    return msg === keyword;
}

export default {
    show:(msg) => {
        let rs = processer(msg);
        if(rs || !msg) return;
        keyboardIsShow ? Toast.showShortCenter(msg) : Toast.show(msg);
    }
};

