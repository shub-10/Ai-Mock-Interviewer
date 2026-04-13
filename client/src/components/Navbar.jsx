import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/authContext'

export const Navbar = () => {
  const { isloggedIn, setisloggedIn } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-10 h-14 border-b border-border bg-background">

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
        <span className="text-sm font-medium">Get Better</span>
      </div>

      <div className="flex items-center gap-2">
        {!isloggedIn ? (
          <>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-85 transition-opacity"
            >
              Get started
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/reports')}
              className="px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              Reports
            </button>
            <div className="w-px h-4 bg-border" />
            <button
              onClick={() => setisloggedIn(false)}
              className="px-4 py-1.5 text-sm text-red-700 border border-border rounded-md hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>

    </nav>
  )
}