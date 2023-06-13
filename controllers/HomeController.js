class HomeController {
  render(req, res) {
    res.render('home')
  }
}

module.exports = new HomeController()
