package com.netease.nim.uikit.EntypoFonts;

import com.joanzapata.iconify.Icon;

public enum MyEntypoIcon implements Icon {
    chevron_thin_left('\uf149');


    char character;

    MyEntypoIcon(char character) {
        this.character = character;
    }

    @Override
    public String key() {
        return name().replace('_', '-');
    }

    @Override
    public char character() {
        return character;
    }
}
