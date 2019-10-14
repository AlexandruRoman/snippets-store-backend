import app from './app'

app.listen(3001, () => {
    console.log('App is running at http://localhost:%d in %s mode', 3001, app.get('env'))
    console.log('Press CTRL-C to sto p\n')
})
