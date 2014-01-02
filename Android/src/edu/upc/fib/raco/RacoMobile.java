/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package edu.upc.fib.raco;

import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;

import org.apache.cordova.*;

public class RacoMobile extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
    	super.onCreate(savedInstanceState);
        
        if (!isTablet()) {
    		// Is phone, support portrait only
    		this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
        
        super.loadUrl(Config.getStartUrl());
    }
    
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
    	super.onConfigurationChanged(newConfig);
    	
    	if (!isTablet()) {
    		return;
    	}
    }
    
    public boolean isTablet() {
    	return (this.getContext().getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) 
    			>= Configuration.SCREENLAYOUT_SIZE_LARGE;
    }
}