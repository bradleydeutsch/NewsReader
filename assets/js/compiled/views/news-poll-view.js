/** @jsx React.DOM */

(function (nh) {
    nh.views.Article = React.createClass({displayName: 'Article',
        getInitialState: function() {
            return {
                isNew: nh.utils.typeCompare(this.props.isNew, nh.utils.types.BOOLEAN) ? this.props.isNew : true
            };
        },

        componentDidMount: function () {
            setTimeout((function (el) {
                return function () {
                    el.setState({
                        isNew: false
                    });
                }
            })(this), 100)
        },

        youClickedOnMe: function (evt) {
            evt.preventDefault();

            alert('Heyyyy, you clicked on "' + this.props.title + '", good for you!');
        },

        render: function () {
            return (
                React.DOM.li({'data-article-id':  this.props.id, className:  this.state.isNew ? 'new' : ''}, 
                    React.DOM.a({href:  '#link-for-' + this.props.id, onClick:  this.youClickedOnMe}, 
                        React.DOM.h3(null,  this.props.title), 
                        React.DOM.div({dangerouslySetInnerHTML: { __html: this.props.description}})
                    )
                )
            );
        }
    });

    nh.views.ArticleList = React.createClass({displayName: 'ArticleList',
        getInitialState: function() {
            return {
                limit: this.props.limit,
                articles: this.props.articles
            };
        },

        componentWillUpdate: function (nextProps, nextState) {
            this.trimArticles();
        },

        trimArticles: function () {
            if (this.state.articles.length > this.state.limit) {
                this.state.articles = this.state.articles.slice(0, (this.state.limit));
            }
        },

        addArticle: function (article) {
            this.state.articles.unshift(article);

            this.forceUpdate();
        },

        addArticles: function (articles) {
            this.state.articles = articles.concat(this.state.articles);

            this.forceUpdate();
        },

        buildArticleListings: function () {
            return this.state.articles.map(function (article) {
                return nh.views.Article({key:  article.id, id:  article.id, title:  article.title, 
                    description:  article.description, isNew:  article.isNew});
            });
        },

        render: function () {
            return (
                React.DOM.ul({className: "articleListing"}, 
                     this.buildArticleListings() 
                )
            );
        }
    });
})(nh);