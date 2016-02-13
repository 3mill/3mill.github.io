var email = "robert@robertqualls.com";

var App = {
    echo: function(text) {
        this.echo(text);
    },
    help: function() {
      showHelp(this);
    },
        ls: function() {
        showHelp(this);
    },
    whoami: function() {
        this.echo("My name is Robert Qualls, and I'm a Rubyist and writer available for freelance projects.");
    },
    contact: function() {
        this.echo("Get in touch via:");
        this.echo("  Email: " + email); 
        this.echo("  Twitter: @robert_qualls_"); 
    },
    email: function() {
        this.echo("Email: " + email); 
    },
          projects: function() {
        var projectsString =
          "  <a href='https://github.com/rlqualls/sugarcane' target='_blank'>sugarcane</a> - a curses interface that lets you jump to errors in your text editor<br/>" + 
          "  <a href='https://github.com/rlqualls/github-gem' target='_blank'>github-gem</a> - a revival of the GitHub gem";
        this.echo("<br/>" + projectsString + "<br/></br>", {raw: true} );
    },
    about: function() {
        this.echo("This page was built with <a href='http://terminal.jcubic.pl/' target='_blank'>jQuery Terminal Emulator</a> plugin, and hosted by <a href='http://pages.github.com' target='_blank'>GitHub Pages<a/>. Source code is also available on <a href='https://github.com/rlqualls/rlqualls.github.com' target='_blank'>GitHub</a>.", {raw:true});
    }
};

jQuery(document).ready(function($) {
    $('#terminal').terminal(App, {
greetings: "",
        prompt: function(p){
            p("$ ");
        },
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        tabcompletion: true
    });
});

function showHelp(consoleObj)
{
        consoleObj.echo("Available commands:");
        consoleObj.echo("\t[[b;#44D544;]about]       about the terminal");
        consoleObj.echo("\t[[b;#44D544;]whoami]      display a short bio");
        consoleObj.echo("\t[[b;#44D544;]projects]    list some projects i've been working on");
        consoleObj.echo("\t[[b;#44D544;]contact]     get in touch"); 
        consoleObj.echo("\t[[b;#44D544;]email]       show email"); 
        consoleObj.echo("\t[[b;#44D544;]clear]       clear the console"); 
        consoleObj.echo("\t[[b;#44D544;]help]        this help screen");                        
        consoleObj.echo("");
        consoleObj.echo("<tab> triggers autocompletion");
}
