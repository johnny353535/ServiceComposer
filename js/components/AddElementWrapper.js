define(["react"], function(React) {


	var AddElementWrapper = React.createClass({
      close: function(){
        $('.addElementWrapper').toggleClass('active');
        $('.flowWrapper').first().toggleClass('dim');
      }, render: function() {
        return (
          <div className="addElementWrapper">
              <div className="navWrapper">
                  <ul className="nav nav-tabs mobile-nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#activities" role="tab" data-toggle="tab">
                          <span className="glyphicon glyphicon-cog"></span>Activities</a>
                      </li>
                      <li role="presentation">
                          <a href="#fragments" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-list-alt"></span>Fragments</a>
                      </li>
                      <button type="button" className="btn btn-default" id="closeAddElementWrapper" onClick={this.close}><span className="glyphicon glyphicon-remove"></span></button>
                  </ul>
                  <div className="tab-content mobile-nav-content">
                      <div role="tabpanel" className="tab-pane active" id="activities">
                          <ul className="media-list">
                              <li className="media">
                                  <a className="media-left" href="#">
                                      <img data-src="holder.js/64x64" alt="64x64" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2MDkzNzUiIHk9IjMyIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9nPjwvc3ZnPg==" data-holder-rendered="true" />
                                  </a>
                                  <div className="media-body">
                                      <h4 className="media-heading">Activity #1</h4>
                                      <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.</p>
                                  </div>
                              </li>
                          </ul>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="fragments">
                          <ul className="media-list">
                              <li className="media">
                                  <a className="media-left" href="#">
                                      <span className="glyphicon glyphicon-question-sign"></span> 
                                  </a>
                                  <div className="media-body">
                                      <h4 className="media-heading">Conditional Fragment</h4>
                                      <p>Executes encapsulated activities based on a given condition</p>
                                  </div>
                              </li>
                              <li className="media">
                                  <a className="media-left" href="#">
                                      <span className="glyphicon glyphicon-pause"></span> 
                                  </a>
                                  <div className="media-body">
                                      <h4 className="media-heading">Parallel Fragment</h4>
                                      <p>Executes multiple activitiy flows at the same time</p>
                                  </div>
                              </li>
                              <li className="media">
                                  <a className="media-left" href="#">
                                      <span className="glyphicon glyphicon-retweet"></span> 
                                  </a>
                                  <div className="media-body">
                                      <h4 className="media-heading">Loop Fragment</h4>
                                      <p>Executes encapsulated activities as long as the provided condition yields true</p>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
        );
      }
    });

    return AddElementWrapper;

});