import React from "react";

const RepositoryListItem = ({repositories}) => {
    return <div className="result-repositories-list">
        {repositories.map((repository, index) => {
            return <div key={index} className="result-repositories-list-item">
                <div style={{
                    padding: '10px 20px',
                }}>
                    {repository.name ? repository.name : 'Repository name is not provided.'}
                </div>
            </div>
        })}
    </div>
}

export default RepositoryListItem;
