import React from 'react';
import PropTypes from 'prop-types';
import API from '../API';
import LinkStore from '../stores/LinkStore';

let _getAppState = () => {
    return {links: LinkStore.getAll()};
};
export default class Main extends React.Component {
    static propTypes = {
        limit: PropTypes.number
    }
    static defaultProps = {
        limit: 5
    }
    state = _getAppState();

    componentDidMount(){
        API.fetchLinks();
        LinkStore.on("change", this.onChange);
    }

    componentWillUnmount(){
        LinkStore.removeListener("change", this.onChange);
    }

    onChange= () => {
        //console.log("4. In view");
        this.setState(_getAppState())
    }

    render(){
        let content = this.state.links.slice(0, this.props.limit).map(link => {
            return <li key={link._id}>
                <a href={link.url}>{link.title}</a>
            </li>;
        });
        return (
            <div>
                <h3>Links</h3>
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
}
