(function() {var templates = {};
templates["confirmation.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<a href=\"#\" class=\"close\">Close</a>\n<p class=\"content\"></p>\n<div class=\"buttons\">\n  <button class=\"button btn-cancel alt\">No</button>\n  <button class=\"button yes\">Yes</button>\n</div>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["debug.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<section class=\"main infobox prose\">\n  <div>\n    <style>\n      dt {\n        clear: left;\n        float: left;\n      }\n      dd {\n        float: left;\n      }\n    </style>\n    <h2>Debug</h2>\n    <p>\n      <button class=\"button\" id=\"submit-debug\">Submit logs</button>\n    </p>\n\n    <p>\n      <button class=\"button\" id=\"clear-localstorage\">Clear <code>localStorage</code></button>\n    </p>\n\n    <h3>Site Settings</h3>\n\n    <dl class=\"site-settings c\">\n      ";
frame = frame.push();
var t_2 = (lineno = 23, colno = 36, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "settings")),"items", env.autoesc), "settings[\"items\"]", []));
if(t_2 !== undefined) {for(var t_1=0; t_1 < t_2.length; t_1++) {
var t_3 = t_2[t_1];
frame.set("setting", t_3);
output += "\n        <dt>";
output += runtime.suppressValue(runtime.memberLookup((t_3),0, env.autoesc), env.autoesc);
output += "</dt>\n        <dd>";
output += runtime.suppressValue(runtime.memberLookup((t_3),1, env.autoesc) || "––", env.autoesc);
output += "</dd>\n      ";
}
}frame = frame.pop();
output += "\n    </dl>\n\n    <h3>User Settings</h3>\n\n    <dl class=\"user-settings c\">\n      ";
frame = frame.push();
var t_5 = (lineno = 32, colno = 47, runtime.callWrap(runtime.memberLookup(((lineno = 32, colno = 39, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"get_settings", env.autoesc), "user[\"get_settin\"]", []))),"items", env.autoesc), "the return value of (user[\"get_settin\"])[\"items\"]", []));
if(t_5 !== undefined) {for(var t_4=0; t_4 < t_5.length; t_4++) {
var t_6 = t_5[t_4];
frame.set("setting", t_6);
output += "\n        <dt>";
output += runtime.suppressValue(runtime.memberLookup((t_6),0, env.autoesc), env.autoesc);
output += "</dt>\n        <dd>";
output += runtime.suppressValue(runtime.memberLookup((t_6),1, env.autoesc) || "––", env.autoesc);
output += "</dd>\n      ";
}
}frame = frame.pop();
output += "\n    </dl>\n\n    <h3>Capabilities</h3>\n\n    <dl class=\"capabilities c\">\n      ";
frame = frame.push();
var t_8 = (lineno = 41, colno = 36, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "capabilities")),"items", env.autoesc), "capabilities[\"items\"]", []));
if(t_8 !== undefined) {for(var t_7=0; t_7 < t_8.length; t_7++) {
var t_9 = t_8[t_7];
frame.set("cap", t_9);
output += "\n        <dt>";
output += runtime.suppressValue(runtime.memberLookup((t_9),0, env.autoesc), env.autoesc);
output += "</dt>\n        <dd>";
output += runtime.suppressValue(runtime.memberLookup((t_9),1, env.autoesc), env.autoesc);
output += "</dd>\n      ";
}
}frame = frame.pop();
output += "\n    </dl>\n\n    <h3>Cache</h3>\n\n    <pre id=\"cache-inspector\"></pre>\n\n    <ul class=\"cache-menu\">\n      ";
frame = frame.push();
var t_11 = (lineno = 52, colno = 26, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cache")),"keys", env.autoesc), "cache[\"keys\"]", []));
if(t_11 !== undefined) {for(var t_10=0; t_10 < t_11.length; t_10++) {
var t_12 = t_11[t_10];
frame.set("k", t_12);
output += "\n        <li><a href=\"#\" data-url=\"";
output += runtime.suppressValue(t_12, env.autoesc);
output += "\">";
output += runtime.suppressValue((lineno = 53, colno = 46, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "filter"), "filter", [t_12])), env.autoesc);
output += "</a></li>\n      ";
}
}frame = frame.pop();
output += "\n    </ul>\n\n    <h3>Recent Logs</h3>\n    <ol class=\"debug-log\">\n      ";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "recent_logs");
if(t_14 !== undefined) {for(var t_13=0; t_13 < t_14.length; t_13++) {
var t_15 = t_14[t_13];
frame.set("entry", t_15);
output += "\n        <li>";
frame = frame.push();
var t_17 = t_15;
if(t_17 !== undefined) {for(var t_16=0; t_16 < t_17.length; t_16++) {
var t_18 = t_17[t_16];
frame.set("piece", t_18);
output += runtime.suppressValue(t_18, env.autoesc);
output += " ";
}
}frame = frame.pop();
output += "</li>\n      ";
}
}frame = frame.pop();
output += "\n    </ol>\n\n    <h3>Persistent Logs</h3>\n    ";
frame = frame.push();
var t_20 = (lineno = 65, colno = 48, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "persistent_logs")),"items", env.autoesc), "persistent_logs[\"items\"]", []));
if(t_20 !== undefined) {var t_19;
if (runtime.isArray(t_20)) {
for (t_19=0; t_19 < t_20.length; t_19++) {
var t_21 = t_20[t_19][0]
frame.set("log_type", t_20[t_19][0]);
var t_22 = t_20[t_19][1]
frame.set("logs", t_20[t_19][1]);
output += "\n      <h4>";
output += runtime.suppressValue(t_21, env.autoesc);
output += "</h4>\n      <ol class=\"debug-log\">\n        ";
frame = frame.push();
var t_24 = t_22;
if(t_24 !== undefined) {for(var t_23=0; t_23 < t_24.length; t_23++) {
var t_25 = t_24[t_23];
frame.set("entry", t_25);
output += "\n          <li>";
frame = frame.push();
var t_27 = t_25;
if(t_27 !== undefined) {for(var t_26=0; t_26 < t_27.length; t_26++) {
var t_28 = t_27[t_26];
frame.set("piece", t_28);
output += runtime.suppressValue(t_28, env.autoesc);
output += " ";
}
}frame = frame.pop();
output += "</li>\n        ";
}
}frame = frame.pop();
output += "\n      </ol>\n    ";
}
} else {
t_19 = -1;
for(var t_29 in t_20) {
t_19++;
var t_30 = t_20[t_29];
frame.set("log_type", t_29);
frame.set("logs", t_30);
output += "\n      <h4>";
output += runtime.suppressValue(t_29, env.autoesc);
output += "</h4>\n      <ol class=\"debug-log\">\n        ";
frame = frame.push();
var t_32 = t_30;
if(t_32 !== undefined) {for(var t_31=0; t_31 < t_32.length; t_31++) {
var t_33 = t_32[t_31];
frame.set("entry", t_33);
output += "\n          <li>";
frame = frame.push();
var t_35 = t_33;
if(t_35 !== undefined) {for(var t_34=0; t_34 < t_35.length; t_34++) {
var t_36 = t_35[t_34];
frame.set("piece", t_36);
output += runtime.suppressValue(t_36, env.autoesc);
output += " ";
}
}frame = frame.pop();
output += "</li>\n        ";
}
}frame = frame.pop();
output += "\n      </ol>\n    ";
}
}
}frame = frame.pop();
output += "\n  </div>\n</section>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["errors/fragment.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<span class=\"fragment-error\">\n  <b>";
output += runtime.suppressValue((lineno = 1, colno = 7, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Oh no!"])), env.autoesc);
output += "</b>\n  ";
output += runtime.suppressValue((lineno = 2, colno = 4, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["An error occurred."])), env.autoesc);
output += "\n</span>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["errors/pagination.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<li class=\"pagination-error loadmore\">\n  <span class=\"error-text\">";
output += runtime.suppressValue((lineno = 1, colno = 29, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Error loading more"])), env.autoesc);
output += "</span>\n  <button class=\"button alt\" data-url=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "more_url"), env.autoesc);
output += "\">";
output += runtime.suppressValue((lineno = 2, colno = 53, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Try Again"])), env.autoesc);
output += "</button>\n  <div class=\"spinner alt btn-replace\"></div>\n</li>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["footer.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div id=\"directory-footer\" class=\"main full c\">\n  <div class=\"group\">\n    <a class=\"button alt devhub\" href=\"/developers/\">";
output += runtime.suppressValue((lineno = 2, colno = 55, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Develop Apps"])), env.autoesc);
output += "</a>\n  </div>\n  <div class=\"group links\">\n    <a href=\"/developers/\">";
output += runtime.suppressValue((lineno = 5, colno = 29, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Developer Hub"])), env.autoesc);
output += "</a>\n    <a href=\"#\" class=\"submit-feedback\">";
output += runtime.suppressValue((lineno = 6, colno = 42, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Feedback"])), env.autoesc);
output += "</a>\n    <a href=\"https://support.mozilla.org/products/firefox-os/marketplace\" target=\"_blank\">";
output += runtime.suppressValue((lineno = 7, colno = 92, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Support"])), env.autoesc);
output += "</a>\n  </div>\n  <div class=\"language group links\">\n    <span class=\"region region-";
output += runtime.suppressValue((lineno = 10, colno = 48, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"get_setting", env.autoesc), "user[\"get_settin\"]", ["region","worldwide"])), env.autoesc);
output += "\">\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "REGIONS")),(lineno = 11, colno = 31, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"get_setting", env.autoesc), "user[\"get_settin\"]", ["region","worldwide"])), env.autoesc), env.autoesc);
output += "</span>\n    ";
if((lineno = 12, colno = 27, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"get_permission", env.autoesc), "user[\"get_permis\"]", ["developer"]))) {
output += "\n      <a href=\"/developers/submissions\">";
output += runtime.suppressValue((lineno = 13, colno = 42, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["My Submissions"])), env.autoesc);
output += "</a>\n    ";
}
output += "\n    ";
if((lineno = 15, colno = 27, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"get_permission", env.autoesc), "user[\"get_permis\"]", ["reviewer"]))) {
output += "\n      <a href=\"/reviewers/apps/queue/\" class=\"only-logged-in\">";
output += runtime.suppressValue((lineno = 16, colno = 64, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Reviewer Tools"])), env.autoesc);
output += "</a>\n    ";
}
output += "\n    ";
if((lineno = 18, colno = 27, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"get_permission", env.autoesc), "user[\"get_permis\"]", ["lookup"]))) {
output += "\n      <a href=\"/lookup/\" class=\"only-logged-in\">";
output += runtime.suppressValue((lineno = 19, colno = 50, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Lookup Tool"])), env.autoesc);
output += "</a>\n    ";
}
output += "\n  </div>\n</div>\n<div id=\"footer\">\n  <div class=\"pad\">\n    <h1 id=\"footzilla\"><a href=\"https://www.mozilla.org/\" target=\"_blank\">mozilla</a></h1>\n    <p>\n      ";
output += runtime.suppressValue((lineno = 27, colno = 8, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Except where otherwise <a href=\"{legal_url}\" target=\"_blank\">noted</a>, content on this site is licensed under the <a href=\"{cc_url}\" target=\"_blank\">Creative Commons Attribution Share-Alike License v3.0</a> or any later version.",runtime.makeKeywordArgs({"legal_url": "http://www.mozilla.org/about/legal.html#site","cc_url": "http://creativecommons.org/licenses/by-sa/3.0/"})])), env.autoesc);
output += "\n    </p>\n    <ul>\n      <li><a href=\"https://marketplace.firefox.com/privacy-policy\">";
output += runtime.suppressValue((lineno = 32, colno = 69, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Privacy Policy"])), env.autoesc);
output += "</a></li>\n      <li><a href=\"https://marketplace.firefox.com/terms-of-use\">";
output += runtime.suppressValue((lineno = 33, colno = 67, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Terms of Use"])), env.autoesc);
output += "</a></li>\n      <li><a href=\"http://mozilla.com/legal/fraud-report/index.html\" target=\"_blank\">\n        ";
output += runtime.suppressValue((lineno = 35, colno = 10, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Report Trademark Abuse"])), env.autoesc);
output += "</a></li>\n    </ul>\n  </div>\n</div>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["header.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<nav role=\"navigation\">\n  <a href=\"#\" id=\"nav-back\" class=\"header-button icon back\" title=\"";
output += runtime.suppressValue((lineno = 1, colno = 69, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Back"])), env.autoesc);
output += "\"><b>";
output += runtime.suppressValue((lineno = 1, colno = 85, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Back"])), env.autoesc);
output += "</b></a>\n  <h1 class=\"site\"><a href=\"";
output += runtime.suppressValue((lineno = 2, colno = 32, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url"), "url", ["home"])), env.autoesc);
output += "\"><span class=\"wordmark\">Firefox Marketplace</span></a></h1>\n  <h2>";
output += runtime.suppressValue((lineno = 3, colno = 8, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Statistics"])), env.autoesc);
output += "</h2>\n  <span class=\"flex-shift\"></span>\n  <span class=\"flex-span\"></span>\n  <div class=\"act-tray\">\n    <a href=\"/settings\" class=\"header-button icon settings\" title=\"";
output += runtime.suppressValue((lineno = 7, colno = 69, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Settings"])), env.autoesc);
output += "\"></a>\n  </div>\n  <a href=\"#\" class=\"header-button persona\">";
output += runtime.suppressValue((lineno = 9, colno = 46, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Sign In"])), env.autoesc);
output += "</a>\n</nav>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["home.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<section class=\"main\">\n  <h1>";
output += runtime.suppressValue((lineno = 1, colno = 8, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Sample Chart"])), env.autoesc);
output += "</h1>\n  <div id=\"chart\"></div>\n</section>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["tests.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<section class=\"main infobox\">\n    <div>\n        <h2>Unit Tests</h2>\n        <progress value=\"0\"></progress>\n        <table>\n            <tr>\n                <th>Started</th>\n                <th>Passed</th>\n                <th>Failed</th>\n            </tr>\n            <tr>\n                <td id=\"c_started\">0</td>\n                <td id=\"c_passed\">0</td>\n                <td id=\"c_failed\">0</td>\n            </tr>\n        </table>\n        <ol class=\"tests\"></ol>\n    </div>\n</section>\n\n<script type=\"text/javascript\" src=\"/tests/cache.js\"></script>\n<script type=\"text/javascript\" src=\"/tests/l10n.js\"></script>\n<script type=\"text/javascript\" src=\"/tests/models.js\"></script>\n<script type=\"text/javascript\" src=\"/tests/requests.js\"></script>\n<script type=\"text/javascript\" src=\"/tests/utils.js\"></script>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
define("templates", ["nunjucks", "helpers"], function(nunjucks) {
    nunjucks.env = new nunjucks.Environment([], {autoescape: true});
    nunjucks.env.registerPrecompiled(templates);
    nunjucks.templates = templates;
    console.log("Templates loaded");
    return nunjucks;
});
})();