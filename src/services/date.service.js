const matchDate = (date) => {
    let match = date.match("(.*)-(.*)-(.*)T(.*:.*):.*")
    return match[3] + '.' + match[2] + '.' + match[1] + ' ' + match[4]
}

export default {matchDate}