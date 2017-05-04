package com.netease.nim.uikit.EntypoFonts;

import com.joanzapata.iconify.Icon;
import com.joanzapata.iconify.IconFontDescriptor;

public class EntypoFontDescriptor implements IconFontDescriptor {

    @Override
    public String ttfFileName() {
        return "fonts/Entypo.ttf";
    }

    @Override
    public Icon[] characters() {
        return MyEntypoIcon.values();
    }

}
