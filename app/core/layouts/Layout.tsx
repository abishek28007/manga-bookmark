import { Suspense } from "react"
import { RecoilRoot } from 'recoil'
import { Image, Head, BlitzLayout, useMutation, Routes, Link } from "blitz"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.svg"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className="flex">
          Userid:{currentUser.id} Userrole:{currentUser.role}
        </div>
        <div>
          <button
            className="button small"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}
const Header = () => {
  return (
    <>
      <div className="mb-8 w-14 h-52 flex">
        <Image src={logo} alt="Manga" />
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>
    </>
  )
}
const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <RecoilRoot>
      <Head>
        <title>{title || "manga-pwa"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </RecoilRoot>
  )
}

export default Layout
