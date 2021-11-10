module.exports = {
    name: "sitemap.xml",

    run: async (req, res) => {
      res.status(200).redirect(`/assets/sitemap.xml`)
    }
}