import XCTest

class BoilerplateUITests: XCTestCase {
  
    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    @MainActor
    func testExample() throws {
        let app = XCUIApplication()
        setupSnapshot(app)
        app.launch()

        snapshot("01Init", waitForLoadingIndicator: true)

        let welcomeTitle = XCUIApplication().otherElements["welcome_screen"]
        welcomeTitle.waitForExistence(timeout: 30)
        snapshot("02WelcomeTitle")
    }
}
