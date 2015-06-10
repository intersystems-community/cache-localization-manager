var App = React.createClass({
    getInitialState: function() {
        return {domain: this.props.domains[0], language: this.props.languages[0], data: []};
    },
    onDomainChanged: function(domain) {
        this.loadMessageList({domain: domain, language: this.state.language})
    },
    onLanguageChanged: function(language) {
        this.loadMessageList({domain: this.state.domain, language: language})
    },
    loadMessageList: function(newState) {
        $.ajax({
            url: 'messages.json',
            dataType: 'json',
            cache: false,
            data: newState,
            success: function(data) {
                newState.data = data;
                this.setState(newState);
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="pure-g">
                <div className="pure-u-1-3 pure-u-md-1-4">
                    <Menu heading="Domain" items={domains} onItemSelected={this.onDomainChanged}/>
                    <Menu heading="Language" items={langs} onItemSelected={this.onLanguageChanged}/>
                </div>
                <div className="pure-u-2-3 pure-u-md-1-2">
                    <MessageList data={this.state.data} />
                </div>
            </div>
        );
    }
});

var Menu = React.createClass({
    getInitialState: function() {
        return {selected: 0};
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
                <Message id={message.id} key={index}>
                    {message.text}
                </Message>
            );
        });
        return (
            <table className="messageList pure-table pure-table-horizontal stretch-horizontal">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
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
        return {editor: false, text: this.props.children};
    },
    messageClicked: function() {
        this.setState({editor: true, text: this.state.text});
    },
    cancelEditing: function(e) {
        e.preventDefault();
        this.setState({editor: false, text: this.state.text});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var textareaValue = React.findDOMNode(this.refs.textarea).value;
        //TODO: call callback to update message on server
        this.setState({editor: false, text: textareaValue});
    },
    render: function() {
        var message = this.state.text;
        if (this.state.editor) {
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
            message = (<td onClick={this.messageClicked}>{this.state.text}</td>);
        }
        return (
            <tr className="Message">
                <td>{this.props.id}</td>
                {message}
            </tr>
        );
    }
});

var domains = ['all', 'sample', 'docs', 'privet'];
var langs = ['en', 'en-gb', 'fr', 'es', 'ru', 'ua', 'pt-br'];

React.render(
    <App domains={domains} languages={langs} />,
    document.getElementById('content')
);