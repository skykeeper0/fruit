import React from 'react';

const styles = {
    container: {
        margin: '0 auto',
        textAlign: 'center',
    },
    input: {
        padding: '30px'
    },
    content: {
        textAlign: 'center',
        padding: '30px'
    }
}

export default class FruitComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fruitList: [],
            inputValue: '',
            fruit: {}
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/fruit-list')
            .then(res => {
                return res.json();
            })
            .then(fruitList => {
                this.setState({
                    fruitList
                })
            }
        )
    }


    onInputChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    onButtonClick() {
        const fruitName = this.state.inputValue;
        this.setState({
            fruit: {}
        }, () => {
            fetch(`http://localhost:3000/api/fruits?name=${fruitName}`)
                .then(res => {
                    return res.json();
                })
                .then(fruit => {
                    if (fruit[0]) {
                        this.setState({
                            fruit: fruit[0]
                        })
                    }
                }
            )
        })
    }

    render() {
        return (
            <div style={styles.container}>
                <h2>Available Fruits</h2>
                {
                    this.state.fruitList.map(fruit => {
                        return (
                            <div>
                                { fruit }
                            </div>
                        )
                    })
                }
                <div style={styles.input}>
                    <input
                        type="text"
                        onChange={this.onInputChange}
                    />
                    <input
                        type="button"
                        onClick={this.onButtonClick}
                        value="search"
                    />
                </div>
                {
                    this.state.fruit.name && (
                        <div style={styles.content}>
                            <h2>
                                {this.state.fruit.name} weight is usually around {this.state.fruit.weight} lb
                            </h2>
                            <img
                                src={this.state.fruit.image}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}
