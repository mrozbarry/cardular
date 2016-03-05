export function newGame (uid, profile) {
  return {
    id: uid,
    name: `${ profile.name }'s Cardular Game`,
    public: false
  }
}
