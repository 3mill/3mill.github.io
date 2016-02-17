/*
 *
 *
 *
 */

var currentFolder = "/";
var termRootPrompt = 'term#th.com/';
var commandText = function(text){
    return "[[g;#EEEEEE;]" + text + "]";
}

var titleText = function(text){
    return "[[u;inherit;]" + text + "]";
}

var adminEmail = "havadartalha@gmail.com"
var me = null;

var getMaxSkillNameLength = function() {
    var max = 0;
    me.skills.forEach(function (item) {
        if(commandText(item.name).length > max) {
            max = commandText(item.name).length;
        }
    });
    return max;
}
var getLevelString = function(level) {
    var perc = level * 10;
    var midString = "";
    for (var i = 0; i < 100; i++) {
        if (i < perc) {
            midString += "=";
        } else {
            midString += " ";
        }
    }
    if (perc > 80) { // Green color.
        return "##[[g;#2DB500;]" + midString + "]##";
    } else if (perc > 60) { // Yellow color.
        return "##[[g;#D4F500;]" + midString + "]##";
    } else if (perc > 40) { // Orange color.
        return "##[[g;#F59F00;]" + midString + "]##";
    } else { // Red color.
        return "##[[g;#DE1600;]" + midString + "]##";
    }
};
var formatString = function (str1, str2, maxLengOfStr1, padRight) {
    var pad = padRight || 0;
    var distance = maxLengOfStr1 - str1.length;
    for (var i = 0; i < distance; i++) {
        if (str1.length < maxLengOfStr1) {
            str1 = str1 + " ";
        }
    }
    if (pad > 0) {
        for (var i = 0; i < pad; i++) {
            str1 = str1 + " ";
        }
    }
    return str1 + str2;
}

var catProjects = function(term) {
    term.echo();
    me.projects.forEach(function(item) {
        term.echo("|  " + commandText(item.name) + "           " + item.url);
    });
    term.echo();
};

var catSkills = function(term) {
    term.echo();
    term.echo("|  " + commandText('My Skills'));
    var maxlen = getMaxSkillNameLength();
    console.log("maxlen",maxlen);
    me.skills.forEach(function(item) {
        var result = formatString(commandText(item.name), getLevelString(item.level),maxlen, 10);
        term.echo("|  " + result);
    });
    term.echo();
};

var catAwards = function (term) {
    term.echo();
    me.awards.forEach(function(item) {
        term.echo("|  " + commandText(item.name) + " - " + item.description);
    });
    term.echo();
};

var catGithub = function(term) {
    term.echo();
    term.echo("|\t" + me.github);
    term.echo();
};

var catLinkedin = function(term) {
    term.echo();
    term.echo("|\t" + me.linkedin);
    term.echo();
};

var catFacebook = function(term) {
    term.echo();
    term.echo("|\t" + me.facebook);
    term.echo();
};

var catTwitter = function(term) {
    term.echo();
    term.echo("|\t" + me.twitter);
    term.echo();
};

var catContact = function(term) {
    term.echo();
    term.echo("|  " + commandText("Email") + ":         " + me.email);
    term.echo("|  " + commandText("LinkedIn") + ":      " + me.linkedin);
    term.echo();
};

var catCredits = function(term) {
    term.echo();
    term.echo("|  Site built by " + commandText('Talha Havadar'));
    term.echo("|  Using " + commandText('Jquery Terminal Emulator') + " by " + commandText('Jakub Jankiewicz') + ": http://terminal.jcubic.pl");
    term.echo();
};

var catAbout = function(term) {
    term.echo();
    term.echo(me.about_me);
    term.echo();
};

var catLastPost = function(term) {
    term.echo();
    term.echo("Coming soon..");
    term.echo();
};

var showFile = function(term, file) {
    if (currentFolder == "/") {
        switch(file) {
            case "about":
                catAbout(term);
                break;
            case "projects":
                catProjects(term);
                break;
            case "skills":
                catSkills(term);
                break;
            case "awards":
                catAwards(term);
                break;
            case "github":
                catGithub(term);
                break;
            case "linkedin":
                catLinkedin(term);
                break;
            case "facebook":
                catFacebook(term);
                break;
            case "twitter":
                catTwitter(term);
                break;
            case "contact":
                catContact(term);
                break;
            case "credits":
                catCredits(term);
                break;
            default:
                return "ERROR";
        }
    } else if(currentFolder == "blog/") {
        switch(file) {
            case "lastPost":
                catLastPost(term);
                break;
            default:
                return "ERROR";
        }
    }

}

var list = function(term) {
    term.echo();
    term.echo(commandText("Current directory: " + currentFolder));
    switch(currentFolder) {
        case "/":
            term.echo();
            term.echo("\t[[b;#eee;]about   ]\t[[b;#00F;]blog   ]\t[[b;#eee;]skills  ]");
            term.echo("\t[[b;#eee;]projects]\t[[b;#eee;]awards ]\t[[b;#00f;]web     ]");
            term.echo("\t[[b;#eee;]contact ]\t[[b;#eee;]twitter]\t[[b;#eee;]facebook]");
            term.echo("\t[[b;#eee;]github  ]\t[[b;#eee;]credits]\t[[b;#eee;]linkedin]");
            term.echo();
            break;
        case "blog/":
            term.echo();
            term.echo("\t[[b;#fff;]lastPost]\t[[b;#00F;]seeWebView]");
            term.echo();
            break;
    }
};

var cd = function(term, path) {
    switch(currentFolder) {
        case "/":
            if (path == "/web" || path == "web/" || path == "/web/" || path == "web") {
                term.echo();
                term.echo("Coming soon..");
                term.echo();
            } else if (path == "/blog" || path == "blog/" || path == "/blog/" || path == "blog") {
                currentFolder = "blog/";
                term.set_prompt(termRootPrompt + currentFolder + " >");
            } else {
                return "ERROR";
            }
            break;
        case "blog/":
            if (path == "/seeWebView" || path == "seeWebView/" || path == "/seeWebView/" || path == "seeWebView") {
                term.echo();
                term.echo("Coming soon..");
                term.echo();
            } else if (path == "..") {
                currentFolder = "/";
                term.set_prompt(termRootPrompt + " >");
            } else {
                return "ERROR";
            }
            break;
    }
};

var App = {
    cd: function(path) {
        if (cd(this,path) == "ERROR") {
            this.error("Wrong argument there is no directory ("+ path +")")
        };
    },
    ls: function() {
        list(this);
    },
    cat: function(file) {
        if (showFile(this,file) == "ERROR") {
            this.error("Wrong argument there is no file ("+ file +")")
        }
    },
    help: function(){
        this.echo();
        this.echo("|  " + commandText("cat") + "              - For review file.");
        this.echo("|  " + commandText("ls") + "               - List files and folders in current directory.");
        this.echo("|  " + commandText("cd") + "               - Change directory.");
        this.echo("|  " + commandText("help") + "             - This screen.");
        this.echo();
    },

    about: function() {
        this.error("Use cat command for review.")
    },
    projects: function() {
        this.error("Use cat command for review.")
    },
    skills: function() {
        this.error("Use cat command for review.")
    },
    awards: function() {
        this.error("Use cat command for review.")
    },
    github: function() {
        this.error("Use cat command for review.")
    },
    linkedin: function() {
        this.error("Use cat command for review.")
    },
    facebook: function() {
        this.error("Use cat command for review.")
    },
    twitter: function() {
        this.error("Use cat command for review.")
    },
    contact: function() {
        this.error("Use cat command for review.")
    },
    credits: function() {
        this.error("Use cat command for review.")
    },
    web: function() {
        this.error("Use cd command for navigate to website.")
    },
    blog: function() {
        this.error("Use cd command for change directory to blog.")
    },
    seeWebView: function() {
        if (currentFolder == "/") {
            this.error("Ther is no file or folder in this directory named (seeWebView)");
        } else {
            this.error("Use cd command for navigate to blog homepage in website.")
        }
    },
    lastPost: function() {
        if (currentFolder == "/") {
            this.error("Ther is no file or folder in this directory named (seeWebView)");
        } else {
            this.error("Use cat command for review.")
        }
    }
}


jQuery(document).ready(function($) {
    $.getJSON('/static/mainApp/json/greeting.json', function(data) {
        console.log(data);
    });
    $.getJSON('/api/cmdadmins/?format=json', function(data) {
        data.forEach(function(item) {
            if (item.email === adminEmail) {
                me = item;
            };

            if (me != null) {
                $('body').terminal(App, {
                    greetings: function(cb){
                        $.getJSON('/static/mainApp/json/greeting.json', function(data) {
                            var message = data.message + "\n\n" + me.greetingMessage + "\n\n";
                            cb($.terminal.encode(message));
                        });
                    },
                    onBlur: function() {
                        // prevent loosing focus
                        return false;
                    },
                    onClear: function(term) {
                        $.getJSON('/static/mainApp/json/greeting.json', function(data) {
                            var message = data.message + "\n\n" + me.greetingMessage + "\n\n";
                            term.echo(message);
                        });
                    },
                    completion: true,
                    checkArity: false,
                    prompt: termRootPrompt + " >"
                });
            } else {
                alert("Something went wrong..");
            }
        });
    });

});
