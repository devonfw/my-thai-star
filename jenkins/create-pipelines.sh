
if [ $# -ne 3 ]
then
  echo "Please invoke this script with three arguments."
  echo "create-pipelines <jenkinsUrl> <user> <password>"
  exit -1
fi

JENKINS_URL=$1
REQUEST="https://$JENKINS_URL"
ENDING='/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)'
CRUMB=$(curl -s "$REQUEST$ENDING" -u $2:$3)
curl -s -XPOST "https://$JENKINS_URL/createItem?name=MTS" -u  $2:$3 --data-binary @./folder.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/createItem?name=CICD" -u  $2:$3 --data-binary @./folder.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/createItem?name=deployment" -u  $2:$3 --data-binary @./folder.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/job/CICD/createItem?name=angular" -u  $2:$3 --data-binary @./angular/cicd/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/job/CICD/createItem?name=java" -u  $2:$3 --data-binary @./java/cicd/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/job/deployment/createItem?name=angular" -u  $2:$3 --data-binary @./angular/deployment/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/job/deployment/createItem?name=java" -u  $2:$3 --data-binary @./java/deployment/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/job/deployment/createItem?name=deployment" -u  $2:$3 --data-binary @./deployment/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"