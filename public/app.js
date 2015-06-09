var App = React.createClass({
    render: function() {
        var data = [
            {id: 'hello', text: 'Hello please'},
            {id: 'any', text: 'Anything you want'},
            {id: 'really', text: 'REally?&&...'}
        ];

        var domains = ['all', 'sample', 'docs', 'privet']
        var langs = ['en', 'en-gb', 'fr', 'es', 'ru', 'ua', 'pt-br']
        return (
            <div className="pure-g">
                <div className="pure-u-1-3 pure-u-md-1-4">
                    <Menu heading="Domain" items={domains} />
                    <Menu heading="Language" items={langs} />
                </div>
                <div className="pure-u-2-3 pure-u-md-1-2">
                    <MessageList data={data} />
                </div>
            </div>
        );
    }
});

var Menu = React.createClass({
    render: function() {
        var menuItems = this.props.items.map(function(item) {
            return (
                <li className="pure-menu-item">
                    <a href="#" className="pure-menu-link">
                        {item}
                    </a>
                </li>
            );
        });
        return (
            <div className="pure-menu">
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
        var messageNodes = this.props.data.map(function(message) {
            return (
                <Message id={message.id}>
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
    render: function() {
        return (
            <tr className="Message">
                <td>{this.props.id}</td>
                <td>{this.props.children}</td>
            </tr>
        );
    }
});


React.render(
    <App />,
    document.getElementById('content')
);