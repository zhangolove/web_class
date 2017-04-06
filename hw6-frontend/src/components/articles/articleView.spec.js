import React from 'react'
import { expect } from 'chai'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { shallow } from 'enzyme'



const findByClassname = (children, classname) => {
    const result = Array.prototype
            .filter.call(children, (it) => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe(' validates ArticlesView ', () => {
    let ArticleViews, AddArticle, Article
    beforeEach(() => {
        const av = require('./articlesView')
        Article = require('./article').Article
        ArticleViews = av.ArticleViews
        AddArticle = av.AddArticle
    })

    // it('should render two articles', () => {
    //     const articles = [
    //         { _id: 1, text: 'test1', 
    //             author: 'abc', date: new Date(), comments: [], img: '' },
    //         { _id: 2, text: 'test2', 
    //             author: 'def', date: new Date(), comments: [], img: '' }
    //     ]
    //     const wrapper =shallow(
    //             <ArticleViews articles={articles} addArticle={_ => _} />)
    //     const articlesInDoc = wrapper.find(".articles").children()
    //     expect(articlesInDoc).to.have.length(articles.length)
    //     articlesInDoc.forEach((a) => expect(a.name()).to.eql('Article'))
    // })

    it('should render a single article ', () => {
       
        const a = 
            { _id: 2, text: 'test2', 
            author: 'def', date: new Date(), comments: [], img: '' }
        
        const singleArticle = TestUtils.renderIntoDocument(<div>
            <Article text={a.text} date={a.date} 
                    img={a.img} author={a.author} comments={a.comments}
                    toggleArticleEditing={(_)=>_}
                    toggleAddComment={(_)=>_} isAddingCmt={false}
                    updateArticleContent={(_)=>_} updateComment={(_)=>_}
                    toggleShowComment={(_)=>_}/>
        </div>)
        const articleInDoc = findDOMNode(singleArticle).children[0]
        expect(articleInDoc.children).to.have.length(1)
        const articleItem = articleInDoc.children[0].children
        expect(articleItem).to.have.length(3)

        const articleMain = findByClassname(articleItem, "articleMain")
        expect(articleMain.children[0].innerHTML)
                        .to.eql(`${a.author} said on ${a.date}`)
        // expect(articleMain.children[1].innerHTML).to.eql(a.text)
    })

    it('should dispatch actions to create a new article', () => {
        let clicked = true
        const node = TestUtils.renderIntoDocument(
            <div><AddArticle addArticle={(_) => clicked = true} /></div>)
        const children = findDOMNode(node).children[0].children
        TestUtils.Simulate.click(children[1])
        expect(clicked).to.be.true
    })

})