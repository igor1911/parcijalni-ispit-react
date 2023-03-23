import './App.css';
import {useState} from "react";
import RepositoryListItem from "./Components/RepositoryListItem";

function App() {

    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState({});
    const [repositories, setRepositories] = useState([]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleReset = () => {
        setRepositories([]);
        setResult({});
        setSearchTerm('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm.length > 3) {
            fetch(`https://api.github.com/users/${searchTerm}`)
                .then(res => res.json())
                .then(data => {
                    setResult(data);

                    if (data.login) {
                        fetch(`https://api.github.com/users/${data.login}/repos`)
                            .then(res => res.json())
                            .then(data => {
                                setRepositories(data);
                            });
                    }
                })
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <span>Github decoder</span>
            </header>

            <div className="input">
                <form onSubmit={e => handleSubmit(e)} style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <label htmlFor="input" style={{
                        display: 'flex',
                        marginBottom: '10px'
                    }}>GitHub username:</label>
                    <input
                        onChange={e => handleChange(e)}
                        value={searchTerm}
                        name="input"
                        type="text"
                        placeholder="e.g. facebook"
                        autoFocus={true}
                        style={{
                            marginBottom: '30px'
                        }}
                    />
                    <button style={{
                        padding: '10px'
                    }}>GO!
                    </button>
                </form>
            </div>

            <div className="result" style={{
                display: (Object.keys(result).length === 0) ? 'none' : 'flex'
            }}>
                <div className="result-header">
                    <img src={result.avatar_url ? result.avatar_url : '/logo192.png'} alt="logo" style={{
                        maxWidth: '100px'
                    }}/>
                    <h1>{result.name ? result.name : 'Name is not provided.'}</h1>
                </div>
                <div className="result-bio">
                    <h3>BIO:</h3>&nbsp;&nbsp;
                    <span>{result.bio ? result.bio : 'Bio is not provided.'}</span>
                </div>
                <div className="result-location">
                    <h3>LOCATION:</h3>&nbsp;&nbsp;
                    <span>{result.location ? result.location : 'Location is not provided.'}</span>
                </div>
                <div className="result-repositories">
                    <h3>REPOSITORIES:</h3>
                    <RepositoryListItem repositories={repositories}/>
                </div>

                <button onClick={handleReset} style={{
                    padding: '10px'
                }}>Reset
                </button>
            </div>

        </div>
    );
}

export default App;
