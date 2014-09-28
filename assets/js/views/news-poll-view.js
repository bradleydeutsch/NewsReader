/** @jsx React.DOM */

(function (nh) {
    nh.views.Article = React.createClass({
        render: function () {
            return (
                <li>
                    <h3>{ this.props.title }</h3>
                    <p>{ this.props.description }</p>
                </li>
            );
        }
    });

    nh.views.ArticleList = React.createClass({
        getInitialState: function() {
            return {
                limit: 10,
                articles: this.props.articles
            };
        },

        addArticle: function (article) {
            this.state.articles.unshift(article);

            this.trimArticles();

            this.forceUpdate();
        },

        addArticles: function (articles) {
            this.state.articles = articles.concat(this.state.articles);

            this.trimArticles();

            this.forceUpdate();
        },

        trimArticles: function () {
            if (this.state.articles.length > this.state.limit) {
                this.state.articles = this.state.articles.slice(0, (this.state.limit));
            }
        },

        buildArticles: function () {
            return this.state.articles.map(function (article) {
                return <nh.views.Article key={ article.id } title={ article.title } description={ article.description } />;
            });
        },

        render: function () {
            return (
                <ul>
                    { this.buildArticles() }
                </ul>
            );
        }
    });
})(nh);