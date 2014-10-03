/** @jsx React.DOM */

(function (nh) {
    nh.views.ArticleListing = React.createClass({displayName: 'ArticleListing',
        getInitialState: function() {
            return {
                isNew: nh.utils.typeCompare(this.props.isNew, nh.utils.types.BOOLEAN) ? this.props.isNew : true
            };
        },

        componentDidMount: function () {
            if (this.state.isNew) {
                setTimeout((function (el) {
                    return function () {
                        el.setState({
                            isNew: false
                        });
                    }
                })(this), 100);
            }
        },

        selectArticle: function (evt) {
            evt.preventDefault();

            nh.eventHandler.publish(null, nh.eventHandler.events.ARTICLE_SELECTED, this);
        },

        render: function () {
            return (
                React.DOM.li({'data-article-id':  this.props.id, className:  this.state.isNew ? 'new' : ''}, 
                    React.DOM.a({href:  '#link-for-' + this.props.id, onClick:  this.selectArticle}, 
                        React.DOM.h3(null,  this.props.title), 
                        React.DOM.div({dangerouslySetInnerHTML: { __html: this.props.description}})
                    )
                )
            );
        }
    });

    nh.views.ArticlesListing = React.createClass({displayName: 'ArticlesListing',
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
            var _this = this;

            return this.state.articles.map(function (article) {
                return nh.views.ArticleListing({key:  article.id, id:  article.id, title:  article.title, 
                    description:  article.description, isNew:  article.isNew, parent: _this });
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

    nh.views.Article = React.createClass({displayName: 'Article',
        render: function () {
            return (
                React.DOM.article({'data-article-id':  this.props.id}, 
                    React.DOM.header(null, 
                        React.DOM.h1(null,  this.props.title)
                    ), 
                    React.DOM.div({className: "articleContent", dangerouslySetInnerHTML: { __html: this.props.description}}), 
                    React.DOM.footer(null, 
                        React.DOM.a({href: "#"}, "Share This")
                    )
                )
            );
        }
    });
})(nh);