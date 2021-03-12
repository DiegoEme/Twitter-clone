import React from 'react'

function Tweet({tweetObject, isOwner}) {
    return (
        
        <div>
            <h4>{tweetObject.data.text}</h4>
            {isOwner && (<><button>Delete</button>
            <button>Edit</button></>)}
        </div>
        
    )
}

export default Tweet
