
var=asciiDirPath
    ?value=`{{ CURRENT_ASCII_DIR_PATH }}`
|var=asciiDirName
    ?func=jsPath.basename
    ?args=
        path=NO_QUOTE:asciiDirPath
|var=copyDestiAsciiDirNameList
    ?func=jsFileSystem.showDirList
    ?args=
        dirPath=`${image2AsciiArtGalleryDirPath}`
    ?method=`split`
    ?methodArgs=
        sepa="\n"
|var=copyDestiAsciiDirNameListCon
    ?id=filter
    ?func=copyDestiAsciiDirNameList.filter
    ?method=join
    ?methodArgs=
        sepa="\n"
    ?exitJudge=`!copyDestiAsciiDirNameListCon`
    ?exitToast="no exist dirs"
    |var=bool
        ?id=filterNotLike
        ?after=filter
        ?value=`NO_QUOTE:el != asciiDirName`
|var=selectedAsciiDirName
    ?func=jsDialog.listDialog
    ?args=
        title="Select copy to dir"
        &msg=
        &listSrc=NO_QUOTE:copyDestiAsciiDirNameListCon
    ?exitJudge=`!selectedAsciiDirName`
|var=copyDestiAsciiDirPath
    ?value=`${image2AsciiArtGalleryDirPath}/${selectedAsciiDirName}`
|var=imageName
    ?value=`${ITEM_NAME}`
|func=jsFileSystem.copyFile
    ?args=
        srcPath=`${asciiDirPath}/${imageName}`
        &destiPath=`${copyDestiAsciiDirPath}/${imageName}`

|var=imageDirPath
    ?value=`${asciiDirPath}/${imageDirName}`
|var=copyDestiImageDirPath
    ?value=`${copyDestiAsciiDirPath}/${imageDirName}`
|func=jsFileSystem.copyFile
    ?args=
        srcPath=`${imageDirPath}/${imageName}`
        &destiPath=`${copyDestiImageDirPath}/${imageName}`
    ?endToast="copy ok"
,