export default function Footer() {
    return(
        <footer className="text-center py-4 bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
          <p>Contact: The Okeogboran Chronicle • Supare Akoko, Ondo State • Est. circa 1600s</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} All rights reserved</p>
        </footer>
    )
}

