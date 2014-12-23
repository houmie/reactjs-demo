/**
 * Created by houman on 22/12/14.
 */

var SearchForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var sid = this.refs.sid.getDOMNode().value.trim();
        if(!sid) {
            return;
        }
        this.props.onSearchSubmit({sid: sid});
        this.refs.sid.getDOMNode().value = '';
        return;
    },
    render: function () {
        return (
            <form className="searchForm" onSubmit={this.handleSubmit}>
                <input type="search" placeholder="Enter SID" ref="sid"/>
                <input type="submit" value="Search"/>
            </form>
        );
    }
});

var SearchResult = React.createClass({
   render: function(){
       var resultRows = this.props.data.map(function(result){
           return (
                <p>{result.x}</p>
           );
       });
       return (
           <div className="searchResult">
                {resultRows}
           </div>
       );
   }
});

var SearchBox = React.createClass({
    handleSearchSubmit: function(search_param){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: search_param,
            success: function(data){
                this.setState({data:data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: [{"x": "Please search."}]};
    },
    render: function(){
        return (
            <div class="row">
                <div class="col-md-3">
                    <div className="searchForm">
                        <SearchForm onSearchSubmit={this.handleSearchSubmit} />
                    </div>
                </div>
                <div class="col-md-7">
                    <div className="searchResult">
                        <SearchResult data={this.state.data} />
                    </div>
                </div>
            </div>
        )
    }
});



React.render(
    <SearchBox url="http://127.0.0.1:5000/search"/>,
    document.getElementById('golden-records')
);
