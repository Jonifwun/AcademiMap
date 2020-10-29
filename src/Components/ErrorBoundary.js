import { Card } from '@material-ui/core'
import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(err, details){
        console.log(err, details)
    }

    static getDerivedStateFromError(error){
        return { hasError: true }
    }

    render() {
        if(this.state.hasError){
            return (
                <Card style={{margin: '100px 30px 40px', backgroundColor: '#0c3141', color: '#FFF', padding: '25px', display: 'flex', justifyContent: 'center'}}>
                    <h5>An error has occurred...</h5>
                </Card>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
