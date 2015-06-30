var App = React.createClass({
    getInitialState: function() {
        return {domain: "", language: "", data: [], spellcheck: false};
    },
    onDomainChanged: function(domain) {
        this.loadMessageList({domain: domain, language: "", spellcheck: false})
    },
    onLanguageChanged: function(language) {
        this.loadMessageList({domain: this.state.domain, language: language, spellcheck: false})
    },
    loadMessageList: function(newState) {
        if (!newState.domain || !newState.language) {
            newState.data = [];
            this.setState(newState);
            return;
        }
        $.ajax({
            url: '/clm/messages',
            dataType: 'json',
            cache: false,
            data: newState,
            success: function(data) {
                newState.data = data;
                this.setState(newState);
            }.bind(this),
            error: function(xhr, status, error) {
                console.error("Loading failure");
            }
        });
    },
    spellcheck: function() {
        this.loadMessageList({domain: this.state.domain, language: this.state.language, spellcheck: true})
    },
    addNewLocalization: function() {
        this.setState({domain: this.state.domain, language: this.state.language, spellcheck: false, addLocalization: true});
    },
    render: function() {
        var languages = [];
        if (this.state.domain) {
            languages = this.props.domains[this.state.domain];
        }

        if (this.state.addLocalization) {
            var mainComponent = (
                <AddLocalizationDialog></AddLocalizationDialog>
            );
        } else {
            var mainComponent = (
                <MessageList
                    data={this.state.data}
                    domain={this.state.domain}
                    language={this.state.language}
                    spellcheck={this.state.spellcheck}
                    key={this.state.domain + this.state.language + this.state.spellcheck} />
            );
        }
        return (
            <div>
                    <Menu heading="Domain" items={Object.keys(this.props.domains)} onItemSelected={this.onDomainChanged}/>
                    <Menu heading="Language" items={languages} key={this.state.domain} onItemSelected={this.onLanguageChanged}/>
                    <button className="pure-button menu-button" onClick={this.spellcheck}>Spellcheck</button>
                    <button className="pure-button menu-button" onClick={this.addNewLocalization}>Add new localization</button>
                    <div className="message-list">
                        {mainComponent}
                    </div>
            </div>
        );
    }  
});

var AddLocalizationDialog = React.createClass({
    render: function() {
        var languages = {
            sq: "Albanian",
            ar: "Arabian",
            hy: "Armenian",
            az: "Azeri",
            be: "Belarusian",
            bs: "Bosnian",
            bg: "Bulgarian",
            ca: "Catalan",
            hr: "Croatian",
            cs: "Czech",
            zh: "Chinese",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            et: "Estonian",
            fi: "Finnish",
            fr: "French",
            ka: "Georgian",
            de: "German",
            el: "Greek",
            he: "Hebrew",
            hu: "Hungarian",
            is: "Icelandic",
            id: "Indonesian",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            lv: "Latvian",
            lt: "Lithuanian",
            mk: "Macedonian",
            ms: "Malay",
            mt: "Maltese",
            no: "Norwegian",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            es: "Spanish",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            sv: "Swedish",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            vi: "Vietnamese"
        }
        var languageOptions = Object.keys(languages).map(function(code) {
            return (<option value={code}>{languages[code]}</option>);
        })
        return (
            <form className="add-localization-form pure-form pure-form-stacked">
                <fieldset>
                    <legend>Add new localization</legend>
                    <select id="translate-to">
                        {languageOptions}
                    </select>
                    <button type="submit" className="pure-button pure-button-primary">
                        Translate
                    </button>
                </fieldset>
            </form>
        );
    }
});

var Menu = React.createClass({
    getInitialState: function() {
        return {selected: -1};
    },
    clicked: function(index) {
        this.setState({selected: index});
        this.props.onItemSelected(this.props.items[index])
    },
    render: function() {
        var menuItems = this.props.items.map(function(item, index) {
            var menuItemClass = 'pure-menu-item';
            if (this.state.selected == index) {
                menuItemClass += ' pure-menu-selected'
            }
            return (
                <li className={menuItemClass} onClick={this.clicked.bind(this, index)} key={index}>
                    <a href="#" className="pure-menu-link">
                        {item}
                    </a>
                </li>
            );
        }.bind(this));
        return (
            <div className="pure-menu custom-menu">
                <span className="pure-menu-heading">
                    {this.props.heading}
                </span>
                <ul className="pure-menu-list">
                    {menuItems}
                </ul>
            </div>
        );
    }
});

var MessageList = React.createClass({
    render: function() {
        var messageNodes = this.props.data.map(function(message, index) {
            return (
                <Message
                    id={message.id}
                    mistakes={message.mistakes}
                    key={index}
                    domain={this.props.domain}
                    language={this.props.language}>
                    {message.text}
                </Message>
            );
        }.bind(this));
        if (this.props.spellcheck) {
            var mistakes = (<th>Mistakes</th>);
        }
        return (
            <table className="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        {mistakes}
                    </tr>
                </thead>
                <tbody> 
                    {messageNodes}
                </tbody>
            </table>
        );
    }
});

var Message = React.createClass({
    getInitialState: function() {
        return {status: 'none', text: this.props.children};
    },
    messageClicked: function() {
        this.setState({status: 'editor', text: this.state.text});
    },
    cancelEditing: function(e) {
        e.preventDefault();
        this.setState({status: 'none', text: this.state.text});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var textareaValue = React.findDOMNode(this.refs.textarea).value;
        var newState = {status: 'pending', text: textareaValue}; 
        this.setState(newState);
        $.ajax({
            url: '/clm/messages',
            type: 'PUT',
            dataType: 'text',
            data: {
                id: this.props.id,
                text: textareaValue,
                domain: this.props.domain,
                language: this.props.language
            },
            success: function() {
                newState.status = 'success';
                this.setState(newState);
            }.bind(this),
            error: function(xhr, status, error) {
                newState.status = 'error';
                this.setState(newState);
            }.bind(this)
        });
    },
    render: function() {
        var message = this.state.text;
        if (this.state.status === 'editor') {
            message = (
                <td>
                    <form className="pure-form" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <textarea ref="textarea" defaultValue={this.state.text}/>
                            <button className="pure-button" type="buttton" onClick={this.cancelEditing}>Cancel</button>
                            <button className="pure-button pure-button-primary" type="submit">Submit</button>
                        </fieldset>
                    </form>
                </td>
            );
        } else {
            var className = 'clickable-message ' + this.state.status;
            message = (<td onClick={this.messageClicked} className={className}>{this.state.text}</td>);
        }
        if (this.props.mistakes) {
            var mistakes =
                (<td>
                    {this.props.mistakes.map(function(mistake) { return (<span className="mistake">{mistake}</span> );})}
                </td>)
        }
        return (
            <tr className="Message">
                <td>{this.props.id}</td>
                {message}
                {mistakes}
            </tr>
        );
    }
});

React.render(
    <App domains={domains}/>,
    document.getElementById('content')
);