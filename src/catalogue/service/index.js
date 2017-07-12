import React from 'react';
import Reflux from 'reflux';
import Store from '../full_catalogue/full_catalogue_store.js';
import Actions from '../full_catalogue/full_catalogue_actions.js';
import DetailsItem from './details_item.js';
import ServiceLogo from '../common/service_logo.js';
import { orderBy } from 'lodash';

class Service extends Reflux.Component {
  constructor() {
    super();
    this.state = {};
    this.store = Store;
    this.storeKeys = ['service'];
  }

  componentDidMount() {
    Actions.getService(this.props.match.params.service);
  }

  renderHtml(markup) {
    return {__html: markup};
  }

  renderDetailsList() {
    let details = [];
    const list = orderBy(this.state.service.service_details_list.service_details, ['version'],['desc']);
    details = list.map((item, index) => {
      return (
        <DetailsItem data={item} key={index} service_name={this.state.service.name} />
      );
    });
    return details;
  }

  render() {
    return (
      <div className="service">
        <h1>{ this.state.service.name }</h1>
        <ServiceLogo img_name={this.state.service.logo} />
        <div className="description-external">
          <h3>What is { this.state.service.name }?</h3>
          <p dangerouslySetInnerHTML={this.renderHtml(this.state.service.description_external)} />
        </div>
        <div className="added-value">
          <h3>What is the added value of { this.state.service.name }?</h3>
          <p dangerouslySetInnerHTML={this.renderHtml(this.state.service.value_to_customer)} />
        </div>
        <div className="request-procedures">
          <h3>How can you get access to { this.state.service.name }?</h3>
          <p dangerouslySetInnerHTML={this.renderHtml(this.state.service.request_procedures)} />
        </div>
        { ( this.state.service.service_details_list && this.state.service.service_details_list.count > 0 ) ?
            this.renderDetailsList() : '' }
      </div>
    );
  }
}

export default Service;
