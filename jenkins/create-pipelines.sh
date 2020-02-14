
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
echo $CRUMB
curl -s -XPOST "https://$JENKINS_URL/createItem?name=MTS" -u  $2:$3 --data-binary @./folder.xml -H $CRUMB -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/createItem?name=MyThaiStar_FRONTEND_BUILD" -u  $2:$3 --data-binary @./angular/cicd/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/createItem?name=MyThaiStar_SERVER_BUILD" -u  $2:$3 --data-binary @./java/cicd/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/createItem?name=MyThaiStar_FRONTEND_DEPLOY" -u  $2:$3 --data-binary @./angular/deployment/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/createItem?name=MyThaiStar_SERVER_DEPLOY" -u  $2:$3 --data-binary @./java/deployment/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
curl -s -XPOST "https://$JENKINS_URL/job/MTS/createItem?name=MyThaiStar_DEPLOY-Together" -u  $2:$3 --data-binary @./deployment/pipeline.xml -H "$CRUMB" -H "Content-Type:text/xml"
