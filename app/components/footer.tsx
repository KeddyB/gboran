export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h5 className="font-serif text-lg mb-4">Contact Us</h5>
          <p className="text-neutral-400">
            Town Hall, Main Street<br />
            Okeogboran<br />
            info@okeogboran.gov
          </p>
        </div>
        <div>
          <h5 className="font-serif text-lg mb-4">Quick Links</h5>
          <ul className="space-y-2 text-neutral-400">
            <li>About Our Town</li>
            <li>Local Services</li>
            <li>Community Events</li>
            <li>Tourism Information</li>
          </ul>
        </div>
        <div>
          <h5 className="font-serif text-lg mb-4">Visit Us</h5>
          <p className="text-neutral-400">
            Experience the charm of Okeogboran firsthand. 
            Our tourist information center is open daily 
            from 9 AM to 5 PM.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-400">
        <p>© {new Date().getFullYear()} Okeogboran. All rights reserved.</p>
      </div>
    </footer>
  )
}