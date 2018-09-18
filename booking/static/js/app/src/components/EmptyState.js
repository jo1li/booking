import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import { VideoEditForm } from './DraggableCodeForms';


class EmptyState extends Component {
    constructor(props) {
      super(props);
      autoBind(this);
    }

    click() {
        console.log("VideoCarousel EmptyState click");

        // Definitely not the way to do this.
        document.querySelectorAll('.open-edit-videos')[0].click();
    }

    render() {
        console.log("VideoCarousel EmptyState")
        console.log("VideoCarousel VideoEditForm", VideoEditForm)
        return (
            <div className="profile-empty-state">
                <div id="open-edit-videos-empty" className="open-edit-videos" onClick={this.click}>
                    <p><span>+</span> Add video</p>
                </div>
            </div>
        )
    }
}

export default EmptyState;
