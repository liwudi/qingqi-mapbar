package com.netease.nim.uikit.common.ui.dialog;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Pair;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.BaseAdapter;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import com.netease.nim.uikit.R;
import com.netease.nim.uikit.common.adapter.TAdapter;
import com.netease.nim.uikit.common.adapter.TAdapterDelegate;
import com.netease.nim.uikit.common.adapter.TViewHolder;
import com.netease.nim.uikit.common.util.sys.ScreenUtil;

import java.util.LinkedList;
import java.util.List;

public class OutSessionDialog extends AlertDialog {

	private TextView titleTextView;
    private TextView confirmTextView;
	private String title;
	private View.OnClickListener titleListener = null;


	public OutSessionDialog(Context context) {
		super(context, R.style.dialog_default_style);
	}


	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.dialog_out_session);
		LinearLayout root = (LinearLayout) findViewById(R.id.ll_out_session_root);
		ViewGroup.LayoutParams params = root.getLayoutParams();
		params.width = (int) ScreenUtil.getDialogWidth();
		root.setLayoutParams(params);
		titleTextView = (TextView) findViewById(R.id.tv_content);
        confirmTextView = (TextView) findViewById(R.id.tv_confirm);
		if (titleTextView != null) {
			setTitle(title);
		}
        if (confirmTextView != null) {
            setTitleListener(titleListener);
        }
	}

	public void setTitle(String title) {
		this.title = title;

		if (!TextUtils.isEmpty(title) && titleTextView != null) {
			titleTextView.setText(title);
		}
	}

    public void setTitleListener(View.OnClickListener titleListener) {
        this.titleListener = titleListener;
        if (titleListener != null && confirmTextView != null) {
            confirmTextView.setOnClickListener(titleListener);
        }
    }

	@Override
	public void show() {
		super.show();
	}

}
