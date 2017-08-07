import chai from 'chai'
import path from 'path'
import fs from 'fs'
import bolt from 'firebase-bolt'
import targaryen from 'targaryen'
import Firebase from 'firebase'

chai.use(targaryen.chai)
const expect = chai.expect

const specRoot = path.join(__dirname, '..')
const appRoot = path.join(specRoot, '..')

const providers = ['facebook', 'google', 'twitter']

function getFirebaseRules() {
  const boltFile = fs.readFileSync(
    path.join(appRoot, 'config', 'rules.bolt'),
    'utf8'
  )
  return bolt.generate(boltFile)
}

describe('Firebase rules', function() {

  it('valid', function () {
    expect(getFirebaseRules).not.to.throw()
  })

  describe('rules', function () {
    before(function() {
      targaryen.setFirebaseData({})

      targaryen.setFirebaseRules(getFirebaseRules())
    })

    describe('unauthenticated', function () {
      const currentUser = targaryen.users.unauthenticated

      it('can read the full tree', function () {
        expect(currentUser).can.read.path('/')
      })

      it('cannot create a user', function () {
        const dummyUser = {
          id: 'dummyId',
          name: 'Unauthenticated User',
          photoUrl: 'http://placehold.it/64x64',
          colour: {
            r: 255,
            g: 0,
            b: 255,
            a: 1
          }
        }
        expect(currentUser).cannot.write(dummyUser).path(`/users/${ dummyUser.id }`)
      })

      it('cannot create a game', function () {
        const dummyGame = {
          id: 'dummyId',
          name: 'Unauthenticated User\'s Game',
          createdAt: (new Date()).toISOString()
        }
        expect(currentUser).cannot.write(dummyGame).path(`/games/${ dummyGame.id }`)
      })
    })

    providers.forEach((provider) => {
      describe(`authenticated with ${ provider }`, function () {
        const currentUser = targaryen.users[provider]

        it('can read the full tree', function () {
          expect(currentUser).can.read.path('/')
        })

        it('can create a user', function () {
          const dummyUser = {
            id: currentUser.uid,
            name: `${ provider.toUpperCase() } User`,
            photoUrl: 'http://placehold.it/64x64',
            colour: {
              r: 255,
              g: 0,
              b: 255,
              a: 1
            }
          }
          expect(currentUser).can.write(dummyUser).path(`/users/${ dummyUser.id }`)
        })

        it('can create a game', function () {
          const dummyGame = {
            id: 'dummyId',
            userId: currentUser.uid,
            name: 'Google User\'s Game',
            createdAt: (new Date()).toISOString()
          }
          expect(currentUser).can.write(dummyGame).path(`/games/${ dummyGame.id }`)
        })
      })
    })

  })


})
