

CRUMB=$(curl -s 'https://devon.s2-eu.capgemini.com/jenkins/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)' -u $1:$2)
curl -s -XPOST 'https://devon.s2-eu.capgemini.com/jenkins/createItem?name=MTS2' -u  $1:$2 --data-binary @./folder.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST 'https://devon.s2-eu.capgemini.com/jenkins/job/MTS2/createItem?name=CICD' -u  $1:$2 --data-binary @./folder.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST 'https://devon.s2-eu.capgemini.com/jenkins/job/MTS2/createItem?name=deployment' -u  $1:$2 --data-binary @./folder.xml -H "$CRUMB" -H "Content-Type:text/xml"